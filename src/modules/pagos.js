const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb")
const DbService = require("../db/dbConection")


class Pago{
    staticPago
    adminClient;
    adminDbService;
    constructor(client=null) {
        if (Pago.instancePago) {
            return Pago.instancePago;
        }
        client ? this.adminClient = client.getClient():this.adminClient = new Client(process.env.ADMIN_USER, process.env.ADMIN_PWD).getClient();
        this.adminDbService = new DbService(this.adminClient);
        Pago.instancePago = this;
    }

}

module.exports = Pago