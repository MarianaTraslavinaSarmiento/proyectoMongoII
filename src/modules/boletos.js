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

    async buyTicket({ticket, metodo_pago}) {

        if (!ticket ||!metodo_pago){
            const error = new Error('Los parámetros de compra deben ser proporcionados')
            error.status = 400
            throw error
        }

        const metodosPagoPermitidos = ["en efectivo", "mastercard", "tarjeta credito VISA", "tarjeta debito VISA"]
        if (!metodosPagoPermitidos.includes(metodo_pago)){
            const error = new Error('El método de pago no es válido')
            error.status = 400
            throw error
        }
        
        if(!usuario_id || !proyeccion_id || !codigo_asiento){
            const error = new Error('El ticket debe tener los parametros requeridos para que la compra sea válida')
            error.status = 400
            throw error
        }
        
        const db = await this.adminDbService.connect();
    
        const screenExist = await checkExists("proyecciones", { _id: new ObjectId(proyeccion_id) },
            `La proyección con id ${proyeccion_id} no existe.`, db);

        const userExist = await checkExists('usuarios', { _id: new ObjectId(usuario_id) },
            `El usuario con id ${usuario_id} no existe.`, db);

        const seatExist = await checkExists('asientos', { numero_asiento: codigo_asiento },
            `El asiento con código ${codigo_asiento} no existe. Verifique si está en el formato específico: (ej: A1)`, db);

        if (seatExist.sala_id.toString() !== screenExist.sala_id.toString()) {
            return {error: `El asiento ${codigo_asiento} no está en la sala de la proyección.`};
        }

        let defaultSubtotal = screenExist.precio;
        let total = defaultSubtotal;
        let descuento_porcentaje = 0;

        if (userExist.tipo == "vip") {
            const cardVIP = await db.collection('tarjetasVIP').findOne({usuario_id: new ObjectId(usuario_id) });
            if (cardVIP && cardVIP.estado == "activa") {
                descuento_porcentaje = cardVIP.descuento_porcentaje;
                total = defaultSubtotal - (defaultSubtotal * descuento_porcentaje) / 100;
            }
        }

        const availableSeat = await db.collection('boletos').findOne({
            codigo_asiento: codigo_asiento,
            proyeccion_id: new ObjectId(proyeccion_id)
        });
        if (availableSeat) {
            return {error: `El asiento ${codigo_asiento} ya tiene un boleto asociado a esta proyección.` };
        }

        const newTicket = {
            _id: new ObjectId(),
            proyeccion_id: new ObjectId(proyeccion_id),
            usuario_id: new ObjectId(usuario_id),
            codigo_asiento: codigo_asiento,
            subtotal: defaultSubtotal,
            porcentaje_descuento_VIP: descuento_porcentaje,
            total: total,
            estado: "pago"
        };

        const ticketPago = {
            boleto_id: new_id,
            monto: total,
            metodo_pago: metodo_pago,
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

    async bookingSeats({proyeccion_id, usuario_id, codigo_asiento}){

        const db = await this.adminDbService.connect();

        const invalidIds = [];

        if (!ObjectId.isValid(proyeccion_id)) {
            invalidIds.push({campo: 'proyeccion_id', valor: proyeccion_id});
        }
        
        if (!ObjectId.isValid(usuario_id)) {
            invalidIds.push({campo: 'usuario_id', valor: usuario_id});
        }
        
        if (invalidIds.length > 0) {
            return {
                status: 400,
                error: 'ID(s) inválido(s)',
                invalidIds: invalidIds
            }
        }

        if(!proyeccion_id || !usuario_id || !codigo_asiento){
            return {
                status: 400,
                error: "Debe proporcionar los parametros necesarios para que la reserva sea exitosa",
                parametrosFaltantes: {
                    proyeccion_id: !proyeccion_id,
                    usuario_id: !usuario_id,
                    codigo_asiento: !codigo_asiento
                }
            }
        }

        const screenExist = await checkExists("proyecciones", { _id: new ObjectId(proyeccion_id) },
            `La proyección con id ${proyeccion_id} no existe.`, db);

        const userExist = await checkExists('usuarios', { _id: new ObjectId(usuario_id) },
            `El usuario con id ${usuario_id} no existe.`, db);

        const seatExist = await checkExists('asientos', { numero_asiento: codigo_asiento },
            `El asiento con código ${codigo_asiento} no existe. Verifique si está en el formato específico: (ej: A1)`, db);

        if (seatExist.sala_id.toString() != screenExist.sala_id.toString()) {
            return { error: `El asiento ${codigo_asiento} no está en la sala de la proyección.` };
        }


        let defaultSubtotal = screenExist.precio
        let total = defaultSubtotal
        let descuento_porcentaje = 0
    
        if (userExist.tipo == "VIP") {
            const cardVIP = await db.collection('tarjetasVIP').findOne({usuario_id: new ObjectId(usuario_id) })
            if (cardVIP && cardVIP.estado == "activa") {
                descuento_porcentaje = cardVIP.descuento_porcentaje
                total = defaultSubtotal - (defaultSubtotal * descuento_porcentaje) / 100
            }
        }

        const availableSeat = await db.collection('boletos').findOne({codigo_asiento: codigo_asiento, proyeccion_id: new ObjectId(proyeccion_id)})
        if (availableSeat){
            return { error: `El asiento ${codigo_asiento} ya tiene un boleto asociado a esta proyección.` };
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

    /**
     * Cancela una reserva de entrada para un cine.
     *
     * @param {string} ticketId - El ID del boleto que se va a cancelar.
     *
     * @returns {Object} - Un objeto que contiene el resultado de la operación de cancelación.
     *                      Si la operación es exitosa, contiene una propiedad 'mensaje' con un mensaje de éxito,
     *                      y una propiedad 'ticketCanceled' con los detalles del boleto cancelado.
     *                      Si se produce un error, contiene una propiedad 'error' con un mensaje de error.
     *
     * @throws Lanza un error si la operación de base de datos falla.
     */
    async cancelBooking({ticketId}) {

        if (!ObjectId.isValid(ticketId)){
            const error = new Error('El id proporcionado es inválido')
            error.status = 400
            throw error
        }

        const db = await this.adminDbService.connect();

        const ticket = await checkExists('boletos', {_id: new ObjectId(ticketId) },
            `El boleto con id ${ticketId} no existe.`,db)

        if (estado !== "reservado") {
            return { error: `El boleto con id ${ticketId} no está en estado reservado y no se puede cancelar.` };
        }

        const result = await db.collection('boletos').updateOne(
            { _id: new ObjectId(ticketId) },
            { $set: { estado: "cancelado" } }
        );
        
        if (result.modifiedCount === 0) {
            return { error: `No se pudo cancelar el boleto con id ${ticketId}.` };
        }

        await this.adminDbService.close();

        return {
            message: `Boleto con id ${ticketId} cancelado con éxito.`,
            ticketCanceled: ticket
        };

    }
}

module.exports = Boleto
