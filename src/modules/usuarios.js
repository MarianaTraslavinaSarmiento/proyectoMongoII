const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb.js")
const DbService = require("../db/dbConection.js")
const checkExists = require("../validators/checkExists.js")
const validEmail = require("../validators/validEmail.js")
const validPhone = require("../validators/validPhone.js")

class Usuario{
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

            if(tipo != 'estandar' && tipo != 'vip' && tipo != 'administrador'){
                return { error: "El tipo de usuario debe ser estandar, vip o administrador únicamente"}
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

            if(tipo == 'administrador'){
                await db.command({
                    createUser: nick,
                    pwd: newUser._id.toString(),
                    roles: [{ role: 'dbOwner', db: 'cineCampus' }]
                });

            } else {
                await db.command({
                    createUser: nick,
                    pwd: newUser._id.toString(),
                    roles: [{ role: tipo, db: 'cineCampus' }]
                });
            }

            return { message: "Usuario creado con éxito", user: newUser };

        }catch(error){
            return { error: error.name, message: error.message };
        } finally {
            await this.adminDbService.close();
        }
    }

    /**
     * Muestra los detalles de un usuario específico en la base de datos y MongoDB.
     *
     * @param {string} userId - El identificador único del usuario.
     *
     * @returns {Promise} - Una promesa que resuelve a un objeto que contiene tanto un mensaje de error como un mensaje de éxito y los detalles del usuario.
     * @returns {Object.error} - Un mensaje de error si la consulta falla.
     * @returns {Object.message} - Un mensaje de éxito si la consulta es exitosa.
     * @returns {Object.user} - Los detalles del usuario obtenidos de la base de datos.
     */
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
                    estado_tarjetaVIP: { $arrayElemAt: ["$tarjetaVIP.estado", 0] }
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

    /**
     * Actualiza el rol de un usuario específico en la base de datos MongoDB.
     *
     * @param {Object} params - Los parámetros necesarios para actualizar el rol del usuario.
     * @param {string} params.id - El identificador único del usuario.
     * @param {string} params.tipo - El nuevo rol para el usuario. Debe ser 'estandar' o 'vip'.
     *
     * @returns {Promise} - Una promesa que resuelve a un objeto que contiene el resultado de la operación.
     * @returns {Object.error} - Un mensaje de error si la operación falla.
     * @returns {Object.message} - Un mensaje de éxito si la operación es exitosa.
     * @returns {Object.user} - El objeto de usuario actualizado.
    */

    async updateRoleOfUsers({id, tipo}) {
        try {
            const db = await this.adminDbService.connect()
            await checkExists('usuarios', {_id: new ObjectId(id)},
            `El usuario con id ${id} no existe.`, db)

            if(tipo != 'estandar' && tipo != 'vip'){
                return { error: "El tipo de usuario debe ser estandar o vip únicamente"}
            }

            const setRoleUser = await db.collection('usuarios').findOneAndUpdate({_id: new ObjectId(id)}, {$set: {tipo: tipo}},{returnNewDocument: true})
            await db.removeUser(setRoleUser.nick)

            await db.command({
                createUser: setRoleUser.nick,
                pwd: setRoleUser._id.toString(),
                roles: [{ role: tipo, db: 'cineCampus' }]
            });

            const newUser = await db.collection('usuarios').findOne({_id: new ObjectId({id})})

            return {
                message: `El rol del usuario ${newUser.nick} ha sido cambiado a ${tipo}.`,
                user: newUser
            }

        } catch (error) {
            console.log(error);
            return {
                error: error.name,
                message: error.message
            }
        } finally {
            await this.adminDbService.close();
        }
    }


    /**
    Retrieves all users from the database and filters them by role if specified.
    @param {string} [tipo] - El rol o tipo de usuario a filtrar. Si no se provee, va a retornar todos los usuarios de la base de datos
    @returns {Promise} - Una promesa que resuelve a un objeto que contiene el resultado de la operación.
    @returns {Object.error} - Mensaje de error si la operacion falla.
    @returns {Object.message} - Mensaje de exito si la operacion corre sin ningun problema.
    @returns {Object.users} - Array de objetos de todos los usuarios que corresponden al tipo especificado (Si se provee). Si no se provee el tipo de usuario a filtrar, retornará todos los usuarios.
    */
    async getAllUsersAndFilterByRole({userId, tipo}){
        try{
            const db = await this.adminDbService.connect()

            const currentUser = await db.collection('usuarios').findOne({ _id: new ObjectId(userId)});
            if (!currentUser) {
                return {error: 'Usuario actual no encontrado.'};
            }

            if (currentUser.tipo !== 'administrador') {
                return {error: 'No tienes autorización para ver la lista de usuarios'};
            }


            if(tipo){

                if(tipo != 'estandar' && tipo != 'vip' && tipo != 'administrador'){
                return { error: "El tipo de usuario debe ser estandar, vip o administrador únicamente"}
            }
                const usersByRole = await db.collection('usuarios').find({tipo: tipo}).toArray()
                return { users: usersByRole };
            } else {
                const users = await db.collection('usuarios').find().toArray()
                return { users: users };
            }

        }catch(error){
            return { error: error.name, message: error.message };
        } finally {
            await this.adminDbService.close();
        }
    }

}

module.exports = Usuario