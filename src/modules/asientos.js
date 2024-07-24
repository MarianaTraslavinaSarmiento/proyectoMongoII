import { ObjectId } from "mongodb";
import Client from "../config/mongodb.js";
import DbService from "../db/dbConection.js";

export class Asiento{
    staticAsiento
    adminClient;
    adminDbService;
    constructor(client=null) {
        if (Asiento.instanceAsiento) {
            return Asiento.instanceAsiento;
        }
        client ? this.adminClient = client.getClient():this.adminClient = new Client(process.env.ADMIN_USER, process.env.ADMIN_PWD).getClient();
        this.adminDbService = new DbService(this.adminClient);
        Asiento.instanceAsiento = this;
    }
}