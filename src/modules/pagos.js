import { ObjectId } from "mongodb";
import Client from "../config/mongodb.js";
import DbService from "../db/dbConection.js";

export class Pago{
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