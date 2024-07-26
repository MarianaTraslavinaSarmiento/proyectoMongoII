import { ObjectId } from "mongodb";
import Client from "../config/mongodb.js";
import DbService from "../db/dbConection.js";
import { checkExists } from "../validators/checkExists.js";

export class Boleto {
    staticBoleto;
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

                if (seatExist.estado != "libre") {
                    return { error: `El asiento ${ticket.codigo_asiento} ya está reservado u ocupado.` };
                }

                let defaultSubtotal = screenExist.precio
                let total = defaultSubtotal
                if (userExist.tipo == "VIP") {
                    const cardVIP = await db.collection('tarjetasVIP').findOne({ usuario_id: new ObjectId(ticket.usuario_id) })
                    if (cardVIP) {
                        if (cardVIP.estado == "activa") {
                            total = defaultSubtotal - (defaultSubtotal * (cardVIP.descuento_porcentaje)) / 100
                        }

                    }

                }



                const newTicket = {
                    _id: new ObjectId(),
                    proyeccion_id: ticket.proyeccion_id,
                    usuario_id: ticket.usuario_id,
                    codigo_asiento: ticket.codigo_asiento,
                    subtotal: defaultSubtotal,
                    porcentaje_descuento_VIP: cardVIP.descuento_porcentaje,
                    total: total,
                    estado: "pago"
                }

                ticketsAprobados.push(newTicket)

                ticketsPagos.push({
                    boleto_id: newTicket._id,
                    metodo_pago: metodo_pago,
                    fecha: new Date(),
                    monto: total,
                    estado: ""


                })


                // await db.collection('boletos').insertOne(newTicket);

            }

            for(let ticketAprobado of ticketsAprobados){
                await db.collection('boletos').insertOne(ticketAprobado);
                await db.collection('asientos').updateOne(
                    { numero_asiento: ticketAprobado.codigo_asiento, sala_id: screenExist.sala_id },
                    { $set: { estado: "ocupado" } }
                );
            }

        } catch (error) {
            return { error: error.name, message: error.message };
        } finally {
            await this.adminDbService.close();
        }
    }
}
