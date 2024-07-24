import { ObjectId } from "mongodb";
import Client from "../config/mongodb.js";
import DbService from "../db/dbConection.js";

export class Proyeccion{
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