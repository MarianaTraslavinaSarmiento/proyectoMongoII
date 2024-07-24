import { ObjectId } from "mongodb";
import Client from "../config/mongodb.js";
import DbService from "../db/dbConection.js";

export class Sala{
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