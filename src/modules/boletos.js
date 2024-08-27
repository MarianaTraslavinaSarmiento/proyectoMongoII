const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb")
const DbService = require("../db/dbConection")
const checkExists = require("../validators/checkExists")


class Boleto {
    instanceBoleto;
    adminClient;
    adminDbService;
    constructor(client = null) {
        if (Boleto.instanceBoleto) {
            return Boleto.instanceBoleto;
        }
        client
            ? (this.adminClient = client.getClient())
            : (this.adminClient = new Client(
                process.env.ADMIN_USER,
                process.env.ADMIN_PWD
            ).getClient());
        this.adminDbService = new DbService(this.adminClient);
        Boleto.instanceBoleto = this;
    }

    /**
     * Este método maneja el proceso de compra de entradas para una proyección de cine.
     * Verifica la existencia de la proyección, el usuario y el asiento, calcula el costo total,
     * y almacena los boletos y pagos en la base de datos.
     *
     * @param {Array} tickets - Un array de objetos de ticket que contienen las siguientes propiedades:
     *                          proyeccion_id: El ID de la proyección.
     *                          usuario_id: El ID del usuario.
     *                          codigo_asiento: El código de asiento.
     * @param {string} metodo_pago - El método de pago.
     *
     * @returns {Object} - Un objeto con las siguientes propiedades:
     *                      success: Un booleano que indica si la operación fue exitosa.
     *                      message: Un mensaje que describe el resultado.
     *                      tickets: Un array de objetos de ticket si la operación fue exitosa.
     *                      pagos: Un array de objetos de pago si la operación fue exitosa.
     *                      error: Un objeto de error si ocurrió algún error.
     *
     * @throws Lanza un error si alguna operación de base de datos falla.
    */

    async buyTicket({ id, proyeccion_id, usuario_id, codigo_asiento, porcentaje_descuento_VIP, total }) {

        const db = await this.adminDbService.connect();

        const seatOccuped = await db.collection("boletos").findOne({ codigo_asiento: codigo_asiento, proyeccion_id: new ObjectId(proyeccion_id) })
        if (seatOccuped) {
            const error = new Error(`El asiento ${codigo_asiento} está ocupado`)
            error.status = 400
            throw error
        }

        const newTicket = {
            _id: new ObjectId(id),
            proyeccion_id: new ObjectId(proyeccion_id),
            usuario_id: new ObjectId(usuario_id),
            codigo_asiento: codigo_asiento,
            porcentaje_descuento_VIP: porcentaje_descuento_VIP,
            total: total,
            estado: "pago",
            fecha: new Date()
        };

        const ticketPago = {
            boleto_id: new ObjectId(id),
            monto: total,
            estado: "completado",
            fecha_hora_pago: new Date(),
        };

        await db.collection('boletos').insertOne(newTicket);
        await db.collection('pagos').insertOne(ticketPago);


        await this.adminDbService.close();

        return {
            status: 200,
            message: "Boleto comprado con éxito",
            ticket: newTicket,
            pago: ticketPago
        };

    }

    /**
     * Este método maneja la reserva de asientos para una proyección de película.
     * Verifica la existencia de la proyección, el usuario y el asiento, calcula el total,
     * y almacena los boletos reservados en la base de datos.
     *
     * @param {Array} tickets - Un array de objetos de ticket que contienen las siguientes propiedades:
     *                          proyeccion_id: El ID de la proyección.
     *                          usuario_id: El ID del usuario.
     *                          codigo_asiento: El código del asiento.
     *
     * @returns {Object} - Un objeto con las siguientes propiedades:
     *                      éxito: Un booleano que indica si la operación fue exitosa.
     *                      mensaje: Un mensaje que describe el resultado.
     *                      tickets: Un array de objetos de ticket si la operación fue exitosa.
     *                      error: Un objeto de error si ocurrió algún error.
     *
     * @throws Lanza un error si alguna operación de base de datos falla.
     */

    async bookingSeats({ proyeccion_id, usuario_id, numero_asiento }) {

        const db = await this.adminDbService.connect();

        const invalidIds = [];

        if (!ObjectId.isValid(proyeccion_id)) {
            invalidIds.push({ campo: 'proyeccion_id', valor: proyeccion_id });
        }

        if (!ObjectId.isValid(usuario_id)) {
            invalidIds.push({ campo: 'usuario_id', valor: usuario_id });
        }

        if (invalidIds.length > 0) {
            return {
                status: 400,
                error: 'ID(s) inválido(s)',
                invalidIds: invalidIds
            }
        }

        if (!proyeccion_id || !usuario_id || !numero_asiento) {
            return {
                status: 400,
                error: "Debe proporcionar los parametros necesarios para que la reserva sea exitosa",
                parametrosFaltantes: {
                    proyeccion_id: !proyeccion_id,
                    usuario_id: !usuario_id,
                    numero_asiento: !numero_asiento
                }
            }
        }

        const screenExist = await checkExists("proyecciones", { _id: new ObjectId(proyeccion_id) },
            `La proyección con id ${proyeccion_id} no existe.`, db);

        const userExist = await checkExists('usuarios', { _id: new ObjectId(usuario_id) },
            `El usuario con id ${usuario_id} no existe.`, db);

        const seatExist = await checkExists('asientos', { numero_asiento: numero_asiento },
            `El asiento con código ${numero_asiento} no existe. Verifique si está en el formato específico: (ej: A1)`, db);

        if (seatExist.sala_id.toString() != screenExist.sala_id.toString()) {
            const error = new Error(`El asiento ${numero_asiento} no está en la sala de la proyección.`)
            error.status = 400
            throw error
        }


        let defaultSubtotal = screenExist.precio
        let total = defaultSubtotal
        let descuento_porcentaje = 0

        if (userExist.tipo == "VIP") {
            const cardVIP = await db.collection('tarjetasVIP').findOne({ usuario_id: new ObjectId(usuario_id) })
            if (cardVIP && cardVIP.estado == "activa") {
                descuento_porcentaje = cardVIP.descuento_porcentaje
                total = defaultSubtotal - (defaultSubtotal * descuento_porcentaje) / 100
            }
        }

        const availableSeat = await db.collection('boletos').findOne({ nuemero_asiento: codigo_asiento, proyeccion_id: new ObjectId(proyeccion_id) })
        if (availableSeat) {
            const error = new Error(`El asiento ${codigo_asiento} ya tiene un boleto asociado a esta proyección.`)
            error.status = 409
            throw error;
        }

        const newTicket = {
            _id: new ObjectId(),
            proyeccion_id: new ObjectId(proyeccion_id),
            usuario_id: new ObjectId(usuario_id),
            codigo_asiento: codigo_asiento,
            subtotal: defaultSubtotal,
            porcentaje_descuento_VIP: descuento_porcentaje,
            total: total,
            estado: "reservado"
        }

        await db.collection('boletos').insertOne(newTicket);

        await this.adminDbService.close();

        return {
            status: 200,
            message: "Asiento reservado con éxito",
            ticket: newTicket,
        };

    }



    async getTheLatestTicketByUser({ userId }) {
        if (!ObjectId.isValid(userId)) {
            const error = new Error('El id proporcionado es inválido')
            error.status = 400
            throw error
        }

        const db = await this.adminDbService.connect();

        const ticket = await db.collection('boletos').aggregate(
            [
                { $match: { usuario_id: new ObjectId(userId) } },
                { $sort: { fecha: -1 } },
                { $limit: 1 }
            ]
        ).toArray()

        await this.adminDbService.close();

        if (!ticket) {
            return {
                message: `No hay ningún boleto asociado al usuario con id ${userId}.`
            };
        }

        console.log(ticket);

        return {
            message: `El boleto más reciente del usuario con id ${userId} es el siguiente:`,
            ticket: ticket[0]
        };
    }

    async getNewId() {
        return new ObjectId()
    }

    async getAllTicketsOfAnSpecificUser({ userId }) {
        if (!ObjectId.isValid(userId)) {
            const error = new Error('El id proporcionado es inválido')
            error.status = 400
            throw error
        }

        const db = await this.adminDbService.connect();

        const tickets = await db.collection('boletos').aggregate(
            [

                {
                    $match: {
                        usuario_id: new ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: "proyecciones",
                        localField: "proyeccion_id",
                        foreignField: "_id",
                        as: "proyeccion_id"
                    }
                },
                {
                    $unwind: "$proyeccion_id"
                },
                {
                    $lookup: {
                        from: "salas",
                        localField: "proyeccion_id.sala_id",
                        foreignField: "_id",
                        as: "proyeccion_id.sala_id"
                    }
                },
                {
                    $unwind: "$proyeccion_id.sala_id"
                },
                {
                    $lookup: {
                        from: "peliculas",
                        localField: "proyeccion_id.pelicula_id",
                        foreignField: "_id",
                        as: "proyeccion_id.pelicula_id"
                    }
                },
                {
                    $unwind: "$proyeccion_id.pelicula_id"
                },
                {
                    $sort: { fecha: -1 }
                }

            ]
        ).toArray()

        return tickets
    }

}

module.exports = Boleto
