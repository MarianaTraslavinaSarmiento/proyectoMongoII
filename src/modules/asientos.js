const { ObjectId } = require('mongodb')
const Client = require("../config/mongodb")
const DbService = require("../db/dbConection")
const checkExists = require('../validators/checkExists')


class Asiento{
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

    
    /**
     * Esta función recupera los asientos disponibles para una proyección específica.
     * Comprueba los boletos existentes para la proyección dada y los compara con todos los asientos de la sala de la proyección.
     *
     * @param {Object} params - Los parámetros de la función.
     * @param {string} params.id - El id de la proyección.
     *
     * @returns {Object} - Un objeto que contiene los asientos disponibles y su recuento total.
     * @returns {Array<string>} [return.availableSeats] - La lista de números de asiento disponibles.
     * @returns {number} [return.totalSeats] - El recuento total de asientos disponibles.
     * @returns {Object} [return.error] - Un objeto que contiene el nombre y el mensaje de error si se produce un error.
     * @returns {string} [return.error.name] - El nombre del error.
     * @returns {string} [return.error.message] - El mensaje de error.
    */

    async availabilityForEachScreening({id}){

        const db = await this.adminDbService.connect();

        if(!ObjectId.isValid(id)){
            const error = new Error('El id de la proyección es inválido')
            error.status = 400
            throw error
        }

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
        
        await this.adminDbService.close();

        return {
            status: 200,
            asientosDisponibles: availableSeats.map(seat => seat.numero_asiento),
            total: availableSeats.length
        }

    }


}

module.exports = Asiento