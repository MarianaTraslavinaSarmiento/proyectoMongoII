import { ObjectId } from "mongodb";
import Client from "../config/mongodb.js";
import DbService from "../db/dbConection.js";
import { checkExists } from "../validators/checkExists.js";

export class Asiento{
    staticAsiento
    adminClient;
    adminDbService;
    constructor(client=null) {
        if (Asiento.instanceAsiento) {
            return Asiento.instanceAsiento;
        }
        client ? this.adminClient = client.getClient():this.adminClient = new Client(process.env.ADMIN_USER, process.env.ADMIN_PWD).getClient();
        this.adminDbService = new DbService(this.adminClient);
        Asiento.instanceAsiento = this;
    }

    async availablForEachScreening({id}){
        try{
            const db = await this.adminDbService.connect();

            const screening = await checkExists("proyecciones", { _id: new ObjectId(id) },
            `La proyección con id ${id} no existe.`, db);

            const allSeats = await db.collection('asientos').find({
                sala_id: screening.sala_id
            }).toArray()

            const tickets = await db.collection('boletos').find(
                { proyeccion_id: new ObjectId(id), estado: { $in: ["pago", "reservado"] }}
            ).toArray();

            const notAvailableSeats = tickets.map(ticket => ticket.codigo_asiento);
            const availableSeats = allSeats.filter(
                seat => !notAvailableSeats.includes(seat.numero_asiento)
            );
            
            return {
                availableSeats: availableSeats.map(seat => seat.numero_asiento),
                totalSeats: availableSeats.length
            }

        }catch(error){
            return { error: error.name, message: error.message };
        } finally {
            await this.adminDbService.close();
        }
    }
}