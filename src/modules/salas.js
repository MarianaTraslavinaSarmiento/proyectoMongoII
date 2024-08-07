const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb")
const DbService = require("../db/dbConection")


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

}

module.exports = Sala