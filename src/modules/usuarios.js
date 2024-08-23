const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb")
const DbService = require("../db/dbConection")
const checkExists = require('../validators/checkExists')
const validEmail = require('../validators/validEmail')
const validPhone = require('../validators/validPhone')


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

        const db = await this.adminDbService.connect();

        if (!nombre || !email || !telefono || !tipo || !nick) {
            const error = new Error ("Todos los campos son obligatorios")  
            error.status = 400
            throw error      
        }

        if(tipo != 'estandar' && tipo != 'vip' && tipo != 'administrador'){
            const error = new Error ("El tipo de usuario debe ser estandar, vip o administrador únicamente")  
            error.status = 400
            throw error     
        }

        const existingUser = await db.collection('usuarios').findOne({nick: nick});
        if (existingUser) {
            const error = new Error ( `El nick  ${nick} ya está en uso`)  
            error.status = 409
            throw error  
        }
        if(!validEmail(email)){
            const error = new Error ("El email no es válido")  
            error.status = 400
            throw error  
        }
        
        if (!validPhone(telefono)) {
            const error = new Error (  "El teléfono no es válido. Asegúrese que esté en formato válido para Colombia" )
            error.status = 400
            throw error
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

        await this.adminDbService.close();
        return { 
            status: 200,
            message: "Usuario creado con éxito", 
            user: newUser 
        };

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
    async showDetailsOfASpecificUser({userId}){

        if (!ObjectId.isValid(userId)){
            const error = new Error('El id proporcionado es inválido')
            error.status = 400
            throw error
        }

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

        await this.adminDbService.close();
        return { user: userInfo };

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

        if (!ObjectId.isValid(id)){
            const error = new Error('El id proporcionado es inválido')
            error.status = 400
            throw error
        }

        const db = await this.adminDbService.connect()
        await checkExists('usuarios', {_id: new ObjectId(id)},
        `El usuario con id ${id} no existe.`, db)

        if(tipo != 'estandar' && tipo != 'vip'){
            const error = new Error("El tipo de usuario debe ser estandar o vip únicamente")
            error.status = 400
            throw error
        }

        const setRoleUser = await db.collection('usuarios').findOneAndUpdate({_id: new ObjectId(id)}, {$set: {tipo: tipo}},{returnNewDocument: true})
        await db.removeUser(setRoleUser.nick)

        await db.command({
            createUser: setRoleUser.nick,
            pwd: setRoleUser._id.toString(),
            roles: [{ role: tipo, db: 'cineCampus' }]
        });

        const newUser = await db.collection('usuarios').findOne({_id: new ObjectId({id})})

        await this.adminDbService.close();

        return {
            message: `El rol del usuario ${newUser.nick} ha sido cambiado a ${tipo}.`,
            user: newUser
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
    async getAllUsersAndFilterByRole({ userId, tipo }) {

        if (!ObjectId.isValid(userId)) {
            const error = new Error('El id proporcionado es inválido');
            error.status = 400;
            throw error;
        }
        
        const db = await this.adminDbService.connect();

        if (!userId) {
            const error = new Error('Se requiere el ID del usuario actual.')
            error.status = 400
            throw error;
        }

        const currentUser = await db.collection('usuarios').findOne({ _id: new ObjectId(userId) });
        if (!currentUser) {
            const error = new Error('Usuario actual no encontrado.')
            error.status = 400
            throw error;
        }

        if (currentUser.tipo !== 'administrador') {
            const error = new Error('No tienes autorización para ver la lista de usuarios')
            error.status = 401
            throw error;
        }

        let query = {};
        if (tipo) {
            if (!['estandar', 'vip', 'administrador'].includes(tipo)) {
                const error = new Error('El tipo de usuario debe ser estandar, vip o administrador únicamente')
                error.status = 400
                throw error;
            }
            query.tipo = tipo;
        }

        const users = await db.collection('usuarios').find(query).toArray();
        
        await this.adminDbService.close();

        return { users };
    }


    async userRepository(nickname, password) {

        const db = await this.adminDbService.connect();

        const userExistis = await db.collection('usuarios').findOne({ nick: nickname });

        if (userExistis) {
            const error = new Error(`El nombre de usuario ${nick} ya está en uso`);
            error.status = 409;
            throw error;
        }

        // TODO: check if the username is greater than 3 characters
        // TODO: check if the password contains at least one uppercase letter
        // TODO: check if the password contains at least one lowercase letter
        // TODO: check if the password contains at least one number
        // TODO: check if the password contains at least one special character
        // TODO: check if the password is a string
        // TODO: check if the username id a string
        

        // const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            nombre: 'nombre',
            email: 'email@example.com',
            telefono: '1234567890',
            tipo: 'estandar',
            fecha_registro: new Date(),
            nick: nickname,
            password: hashedPassword,
        };

        await db.collection('usuarios').insertOne(newUser);
        return {
            message: 'Usuario creado con éxito',
            user: newUser,
        }


    }

}

module.exports = Usuario