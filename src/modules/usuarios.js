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
            if(!validEmail(email)){
                return { error: "El email no es válido" };
            }
            
            if (!validPhone(telefono)) {
                return { error: "El teléfono no es válido. Asegúrese que esté en formato válido para Colombia" };
            }
        
            const newUser = {
                nombre: nombre,
                email: email,
                telefono: telefono,
                tipo: tipo,
                fecha_registro: new Date(),
                nick: nick,
            }
            
            await db.collection('usuarios').insertOne(newUser);

            await db.command({
                createUser: nick,
                pwd: newUser._id.toString(),
                roles: [{ role: tipo, db: 'cineCampus' }]
            });

            return { message: "Usuario creado con éxito", user: newUser };

        }catch(error){
            return { error: error.name, message: error.message };
        } finally {
            await this.adminDbService.close();
        }
    }

}