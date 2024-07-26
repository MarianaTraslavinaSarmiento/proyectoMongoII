import { ObjectId } from "mongodb";
import Client from "../config/mongodb.js";
import DbService from "../db/dbConection.js";
import { checkExists } from "../validators/checkExists.js";

export class Boleto {
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

    async buyTickets(tickets, metodo_pago) {

        try {

            const db = await this.adminDbService.connect();

            let ticketsAprobados = []
            let ticketsPagos = []

            for (let ticket of tickets) {

                const screenExist = await checkExists("proyecciones", { _id: new ObjectId(ticket.proyeccion_id) },
                    `La proyección con id ${ticket.proyeccion_id} no existe.`, db);

                const userExist = await checkExists('usuarios', { _id: new ObjectId(ticket.usuario_id) },
                    `El usuario con id ${ticket.usuario_id} no existe.`, db);

                const seatExist = await checkExists('asientos', { numero_asiento: ticket.codigo_asiento },
                    `El asiento con código ${ticket.codigo_asiento} no existe. Verifique si está en el formato específico: (ej: A1)`, db);

                if (seatExist.sala_id.toString() != screenExist.sala_id.toString()) {
                    return { error: `El asiento ${ticket.codigo_asiento} no está en la sala de la proyección.` };
                }


                let defaultSubtotal = screenExist.precio
                let total = defaultSubtotal
                let descuento_porcentaje = 0
            
                if (userExist.tipo == "VIP") {
                    const cardVIP = await db.collection('tarjetasVIP').findOne({usuario_id: new ObjectId(ticket.usuario_id) })
                    if (cardVIP && cardVIP.estado == "activa") {
                        descuento_porcentaje = cardVIP.descuento_porcentaje
                        total = defaultSubtotal - (defaultSubtotal * descuento_porcentaje) / 100
                    }
                }

                const availableSeat = await db.collection('boletos').findOne({codigo_asiento: ticket.codigo_asiento, proyeccion_id: new ObjectId(ticket.proyeccion_id)})
                if (availableSeat){
                    return { error: `El asiento ${ticket.codigo_asiento} ya tiene un boleto asociado a esta proyección.` };
                }

                const newTicket = {
                    _id: new ObjectId(),
                    proyeccion_id: new ObjectId(ticket.proyeccion_id),
                    usuario_id: new ObjectId(ticket.usuario_id),
                    codigo_asiento: ticket.codigo_asiento,
                    subtotal: defaultSubtotal,
                    porcentaje_descuento_VIP: descuento_porcentaje,
                    total: total,
                    estado: "pago"
                }
            
                ticketsAprobados.push(newTicket)
            
                ticketsPagos.push({
                    boleto_id: newTicket._id,
                    monto: total,
                    metodo_pago: metodo_pago,
                    estado: "completado",
                    fecha_hora_pago: new Date(),
                })
            }
    
            for(let ticketAprobado of ticketsAprobados){
                await db.collection('boletos').insertOne(ticketAprobado);
            }

            for (let ticketPago of ticketsPagos ){
                await db.collection('pagos').insertOne(ticketPago);
            }

            return {
                success: true,
                message: "Boletos comprados con éxito",
                tickets: ticketsAprobados,
                pagos: ticketsPagos
            };

        } catch (error) {
            return { error: error.name, message: error.message };
        } finally {
            await this.adminDbService.close();
        }
    }
}
