const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb")
const DbService = require("../db/dbConection")
const checkExists = require('../validators/checkExists')
const validEmail = require('../validators/validEmail')
const validPhone = require('../validators/validPhone')
const bcrypt = require('bcrypt')


class Usuario {
    staticUsuario
    adminClient;
    adminDbService;
    constructor(client = null) {
        if (Usuario.instanceUsuario) {
            return Usuario.instanceUsuario;
        }
        client ? this.adminClient = client.getClient() : this.adminClient = new Client(process.env.ADMIN_USER, process.env.ADMIN_PWD).getClient();
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
    async createUsers({ nombre, email, telefono, tipo, nick }) {

        const db = await this.adminDbService.connect();

        if (!nombre || !email || !telefono || !tipo || !nick) {
            const error = new Error("Todos los campos son obligatorios")
            error.status = 400
            throw error
        }

        if (tipo != 'estandar' && tipo != 'vip' && tipo != 'administrador') {
            const error = new Error("El tipo de usuario debe ser estandar, vip o administrador únicamente")
            error.status = 400
            throw error
        }

        const existingUser = await db.collection('usuarios').findOne({ nick: nick });
        if (existingUser) {
            const error = new Error(`El nick  ${nick} ya está en uso`)
            error.status = 409
            throw error
        }
        if (!validEmail(email)) {
            const error = new Error("El email no es válido")
            error.status = 400
            throw error
        }

        if (!validPhone(telefono)) {
            const error = new Error("El teléfono no es válido. Asegúrese que esté en formato válido para Colombia")
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

        if (tipo == 'administrador') {
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

    async showDetailsOfASpecificUser( userId ) {

        console.log(userId);
        

        // if (!ObjectId.isValid(userId)) {

        //     const error = new Error('El id proporcionado es inválido')
        //     error.status = 400
        //     throw error
        // }

        const db = await this.adminDbService.connect();
        const user = await checkExists("usuarios", { _id: new ObjectId(userId) },
            `El usuario con id ${userId} no existe.`, db);

        const userInfo = await db.collection('usuarios').findOne({_id: new ObjectId(userId)})

        await this.adminDbService.close();
        return { 
            status: 200,
            success: true,
            user: userInfo
        };

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

    async updateRoleOfUsers({ id, tipo }) {

        if (!ObjectId.isValid(id)) {
            const error = new Error('El id proporcionado es inválido')
            error.status = 400
            throw error
        }

        const db = await this.adminDbService.connect()
        await checkExists('usuarios', { _id: new ObjectId(id) },
            `El usuario con id ${id} no existe.`, db)

        if (tipo != 'estandar' && tipo != 'vip') {
            const error = new Error("El tipo de usuario debe ser estandar o vip únicamente")
            error.status = 400
            throw error
        }

        const setRoleUser = await db.collection('usuarios').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { tipo: tipo } }, { returnNewDocument: true })
        await db.removeUser(setRoleUser.nick)

        await db.command({
            createUser: setRoleUser.nick,
            pwd: setRoleUser._id.toString(),
            roles: [{ role: tipo, db: 'cineCampus' }]
        });

        const newUser = await db.collection('usuarios').findOne({ _id: new ObjectId({ id }) })

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


    async userRepository({fullname, email, nickname, password}) {

        const db = await this.adminDbService.connect();

        userValidation.nickname(nickname)
        userValidation.password(password)
        userValidation.email(email)

        const userExistis = await db.collection('usuarios').findOne({ nickname: nickname });

        if (userExistis) {
            const error = new Error(`User name ${nickname} is already in use`);
            error.status = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

        const newUser = {
            _id: new ObjectId(),
            nombre: fullname,
            email: email,
            nickname: nickname,
            clave: hashedPassword,
        };

        await db.collection('usuarios').insertOne(newUser);
        return {
            status: 200,
            success: true,
            message: 'Usuario creado con éxito'
        }

    }


    async login({nickname, password}){

        userValidation.nickname(nickname)

        const db = await this.adminDbService.connect();

        const user = await db.collection('usuarios').findOne({ nickname: nickname });
        if(!user){
            const error = new Error(`The password is incorrect`)
            error.status = 404;
            throw error;
        }

        const match = await bcrypt.compare(password, user.clave);
        if(!match){
            const error = new Error(`La contraseña es incorrecta`)
            error.status = 401;
            throw error;
        }

        const { password: _, ...publicUser} = user
        return publicUser

    }

}


class userValidation {

    static nickname(nickname){

        if (typeof nickname !== 'string' || nickname.length < 3) {
            const error = new Error('The user name must be at least 3 characters long');
            error.status = 400;
            throw error;
        }

    }

    static email(email){
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (typeof email !== 'string' || !emailPattern.test(email)) {
            const error = new Error('The e-mail address is invalid');
            error.status = 400;
            throw error;
        }
    }

    static password(password){

        if (typeof password !== 'string') {
            const error = new Error('The password must be a text string');
            error.status = 400;
            throw error;
        }

        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;
        const numberPattern = /\d/;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

        if (!uppercasePattern.test(password)) {
            const error = new Error('The password must contain at least one capital letter');
            error.status = 400;
            throw error;
        }

        if (!lowercasePattern.test(password)) {
            const error = new Error('The password must contain at least one lowercase letter');
            error.status = 400;
            throw error;
        }

        if (!numberPattern.test(password)) {
            const error = new Error('The password must contain at least one number');
            error.status = 400;
            throw error;
        }

        if (!specialCharPattern.test(password)) {
            const error = new Error('The password must contain at least one special character');
            error.status = 400;
            throw error;
        }

    }

}

module.exports = Usuario