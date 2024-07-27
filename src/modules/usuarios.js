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

    /**
     * Crea un nuevo usuario en la base de datos y MongoDB.
     *
     * @param {Object} user - El objeto de usuario que contiene las siguientes propiedades:
     * @param {string} user.nombre - El nombre del usuario.
     * @param {string} user.email - El correo electrónico del usuario.
     * @param {string} user.telefono - El número de teléfono del usuario.
     * @param {string} user.tipo - El tipo de usuario (por ejemplo, admin, usuario).
     * @param {string} user.nick - El apodo del usuario.
     *
     * @returns {Object} - Un objeto que contiene tanto un mensaje de error como un mensaje de éxito y el usuario creado.
     * @returns {Object.error} - Un mensaje de error si la creación del usuario falla.
     * @returns {Object.message} - Un mensaje de éxito si la creación del usuario es exitosa.
     * @returns {Object.user} - El objeto de usuario creado.
     */
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

    async showDetailsOfASpecificUser(userId){
        try{

            const db = await this.adminDbService.connect();
            
            const user = await checkExists("usuarios", { _id: new ObjectId(userId) },
            `El usuario con id ${userId} no existe.`, db);

            const userInfo = await db.collection('usuarios').aggregate([

                {
                    $match: {_id: new ObjectId(userId)}
                },

                {
                  $lookup: {
                    from: "tarjetasVIP",
                    localField: "_id",
                    foreignField: "usuario_id",
                    as: "tarjetaVIP"
                  }
                },
                {
                  $addFields: {
                    vip_card_status: { $arrayElemAt: ["$tarjetaVIP.estado", 0] }
                  }
                },
                {
                  $project: {
                    tarjetaVIP: 0
                  }
                }
            ]).toArray()

            return { user: userInfo };

        }catch(error){
            return { error: error.name, message: error.message };
        } finally {
            await this.adminDbService.close();
        }
    }

}