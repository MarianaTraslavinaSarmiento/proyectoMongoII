import { ObjectId } from "mongodb";
import Client from "../config/mongodb.js";
import DbService from "../db/dbConection.js";
import { checkExists } from "../validators/checkExists.js";
import { validEmail } from "../validators/validEmail.js";
import { validPhone } from "../validators/validPhone.js";


export class Usuario{
    staticUsuario
    adminClient;
    adminDbService;
    constructor(client=null) {
        if (Usuario.instanceUsuario) {
            return Usuario.instanceUsuario;
        }
        client ? this.adminClient = client.getClient():this.adminClient = new Client(process.env.ADMIN_USER, process.env.ADMIN_PWD).getClient();
        this.adminDbService = new DbService(this.adminClient);
        Usuario.instanceUsuario = this;
    }

    async createUsers({nombre, email, telefono, tipo, nick}){
        try{

            const db = await this.adminDbService.connect();

            if (!nombre || !email || !telefono || !tipo || !nick) {
                return {error: "Todos los campos son obligatorios"};
            }

            const existingUser = await db.collection('usuarios').findOne({nick: nick});
            if (existingUser) {
                return {error: `El nick  ${nick} ya está en uso`};
            }

        }catch(error){
            return { error: error.name, message: error.message };
        } finally {
            await this.adminDbService.close();
        }
    }

}