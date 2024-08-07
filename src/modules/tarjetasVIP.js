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

}

module.exports = TarjetaVIP