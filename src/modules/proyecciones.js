const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb")
const DbService = require("../db/dbConection")


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

}

module.exports = Proyeccion