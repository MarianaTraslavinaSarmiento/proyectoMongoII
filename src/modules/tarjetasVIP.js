const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb")
const DbService = require("../db/dbConection")


class TarjetaVIP{
    staticTarjetaVIP
    adminClient;
    adminDbService;
    constructor(client=null) {
        if (TarjetaVIP.instanceTarjetaVIP) {
            return TarjetaVIP.instanceTarjetaVIP;
        }
        client ? this.adminClient = client.getClient():this.adminClient = new Client(process.env.ADMIN_USER, process.env.ADMIN_PWD).getClient();
        this.adminDbService = new DbService(this.adminClient);
        TarjetaVIP.instanceTarjetaVIP = this;
    }

    async getAllVipCardsByUser({userId}){

        if (!ObjectId.isValid(userId)){
            const error = new Error('El id del usuario es inválido')
            error.status = 400
            throw error
        }

        const db = await this.adminDbService.connect()

        const userExists = await db.collection('usuarios').findOne({ _id: new ObjectId(userId) });
        if (!userExists) {
            const error = new Error(`El usuario no existe`)
            error.status = 400
            throw error
        }

        const vipCardsAvailable = await db.collection("tarjetasVIP").find({"usuario_id": new ObjectId(userId), "estado": "activa"}).toArray();
        return vipCardsAvailable;

    }
    

}

module.exports = TarjetaVIP