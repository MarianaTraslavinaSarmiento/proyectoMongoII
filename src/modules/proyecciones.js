const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb")
const DbService = require("../db/dbConection")
const checkExists = require('../validators/checkExists')


class Proyeccion{
    staticProyeccion
    adminClient;
    adminDbService;
    constructor(client=null) {
        if (Proyeccion.instanceProyeccion) {
            return Proyeccion.instanceProyeccion;
        }
        client ? this.adminClient = client.getClient():this.adminClient = new Client(process.env.ADMIN_USER, process.env.ADMIN_PWD).getClient();
        this.adminDbService = new DbService(this.adminClient);
        Proyeccion.instanceProyeccion = this;
    }

    async getAllTheProjectionsByMovieAndDate({movieId, date}){

        if (!ObjectId.isValid(movieId)){
            const error = new Error('El id de la película es inválido')
            error.status = 400
            throw error
        }

        const db = await this.adminDbService.connect()

        const movie = await checkExists("peliculas", { _id: new ObjectId(movieId) }, `La pelicula proporcionada no existe`, db);

        const projections = await db.collection("proyecciones").aggregate(
        [
            {
              $match: {
                pelicula_id: new ObjectId(movieId),
                fecha: date
              }
            },
          
            {
              $lookup: {
                from: 'salas',
                localField: 'sala_id',
                foreignField: '_id',
                as: 'sala_id'
              }
            },

            {
              $unwind: '$sala_id'
            }
            
        ]).toArray()

        return projections
    }

    async getSeatsByScreening({ screeningId }) {

      if (!ObjectId.isValid(screeningId)) {
          const error = new Error('El id de la proyección es inválido');
          error.status = 400;
          throw error;
      }

      const db = await this.adminDbService.connect();
      const screening = await checkExists("proyecciones", { _id: new ObjectId(screeningId) }, `La proyección proporcionada no existe`, db);
      const seats = await db.collection("asientos").find({sala_id: screening.sala_id}).toArray();

      return seats;
    }
  

}

module.exports = Proyeccion