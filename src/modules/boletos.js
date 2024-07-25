import { ObjectId } from "mongodb";
import Client from "../config/mongodb.js";
import DbService from "../db/dbConection.js";

export class Boleto{
    staticBoleto
    adminClient;
    adminDbService;
    constructor(client=null) {
        if (Boleto.instanceBoleto) {
            return Boleto.instanceBoleto;
        }
        client ? this.adminClient = client.getClient():this.adminClient = new Client(process.env.ADMIN_USER, process.env.ADMIN_PWD).getClient();
        this.adminDbService = new DbService(this.adminClient);
        Boleto.instanceBoleto = this;
    }

    

    async buyTickets({proyeccion_id, usuario_id, codigo_asiento}){
        try{
            const db = await this.adminDbService.connect();
            // Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.

            // Validaciones (si existe)
            // proyeccion, usuario

            // verificar si usuario es vip, si es vip hacer la agregacion para buscar su tarjeta, si se encuentra su tarjeta extraer el descuento y aplicarselo al subtotal
            // lo que salga del subtotal - subtotal * descuento vip ponerselo al total,
            // de los que si hayan pasado todos los test

            const screenExist = await db.collection('proyecciones').findOne({_id: new ObjectId(proyeccion_id)})
            const error = !screenExist ? { error: `La proyección con id ${proyeccion_id} no existe.` } : null;
            if (error) return error;

            const userExist = await db.collection('usuarios').findOne({_id: new ObjectId(usuario_id)})
            const errorUser =!userExist ? { error: `El usuario con id ${usuario_id} no existe.` } : null;
            if (errorUser) return errorUser;

            const seatExist = await db.collection('asientos').findOne({numero_asiento: codigo_asiento})
            const errorSeat =!seatExist ? { error: `El asiento con código ${codigo_asiento} no existe. Verifique si está en el formato específico: (ej: A1)` } : null;
            if (errorSeat) return errorSeat;

            const screenSeatExist = await db.collection('asientos').findOne({
                numero_asiento: codigo_asiento, 
                sala_id: screenExist.sala_id, 
                estado: "libre"
            })
            const errorScreenSeat =!screenSeatExist? { error: `El asiento con código ${codigo_asiento} no está disponible en la sala de la proyección.` } : null;
            if (errorScreenSeat) return errorScreenSeat;


        }catch(error){
            return {error: error.name, 
                    message: error.message}
        }finally{
            await this.adminDbService.close();
        }
    }

}