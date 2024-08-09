const { ObjectId } = require("mongodb");
const express = require('express');
const Boleto = require("../modules/boletos");
const boletosRouter = express.Router()

let obj = new Boleto();

boletosRouter.post('/comprar_boleto', async (req, res, next) => {
    try {
        const { ticket, metodo_pago } = req.body;
        const result = await obj.buyTicket({ticket, metodo_pago});
        res.send(result);

    } catch (error) {
        next(error)
    }
})

boletosRouter.post('/reservas_asientos', async(req, res, next)=>{

    try{
        
        const {proyeccion_id, usuario_id, codigo_asiento} = req.body
        const result = await obj.bookingSeats({proyeccion_id, usuario_id, codigo_asiento})
        res.send(result)

    }catch(error){
        next(error)
    }
})

module.exports = boletosRouter