const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb")
const DbService = require("../db/dbConection")
const checkExists = require('../validators/checkExists')


class Sala{
    staticSala
    adminClient;
    adminDbService;
    constructor(client=null) {
        if (Sala.instanceSala) {
            return Sala.instanceSala;
        }
        client ? this.adminClient = client.getClient():this.adminClient = new Client(process.env.ADMIN_USER, process.env.ADMIN_PWD).getClient();
        this.adminDbService = new DbService(this.adminClient);
        Sala.instanceSala = this;
    }

    async seatsOfEachRoom({id}){
        const db = await this.adminDbService.connect();

        if(!ObjectId.isValid(id)){
            const error = new Error('El id de la sala es inválido')
            error.status = 400
            throw error
        }

        const sala = await checkExists("salas", { _id: new ObjectId(id) },
        `La sala con id ${id} no existe.`, db);

        const allSeats = await db.collection('asientos').find({
            sala_id: new ObjectId(id)
        }).toArray()

        const totalSeats = allSeats.length

        await this.adminDbService.close();

        return {
            status: 200,
            totalAsientos: totalSeats,
            asientos: allSeats
        }
    }

}

module.exports = Sala