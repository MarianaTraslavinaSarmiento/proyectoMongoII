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

        await this.adminDbService.connect()

        const movie = await checkExists("peliculas", { _id: new ObjectId(movieId) }, db);

        if (!movie) {
            const error = new Error(`La película proporcionada no existe`);
            error.status = 400;
            throw error;
        }

        const projections = await db.collection('proyecciones').aggregate(
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
            }
            
        ]).toArray()

        return projections
    }

}

module.exports = Proyeccion