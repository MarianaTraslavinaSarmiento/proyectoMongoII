const { ObjectId } = require("mongodb");
const express = require('express');
const Boleto = require("../modules/boletos");
const boletosRouter = express.Router()

let obj = new Boleto();

boletosRouter.post('/comprar_boleto', async (req, res, next) => {
    try {
        const  { id, proyeccion_id, usuario_id, codigo_asiento, porcentaje_descuento_VIP, total } = req.body;
        const result = await obj.buyTicket({ id, proyeccion_id, usuario_id: req.user.id, codigo_asiento, porcentaje_descuento_VIP, total });
        res.send(result);

    } catch (error) {
        next(error)
    }
})

boletosRouter.post('/reservas_asientos', async (req, res, next) => {

    try {

        const { proyeccion_id, usuario_id, codigo_asiento } = req.body
        const result = await obj.bookingSeats({ proyeccion_id, usuario_id, codigo_asiento })
        res.send(result)

    } catch (error) {
        next(error)
    }
})


boletosRouter.get('/newid', async (req, res, next) =>{
    try {
        const newId = await obj.getNewId()
        res.send(newId)
    } catch (error) {
        next(error)
    }
})


boletosRouter.get('/latestTicket', async(req, res, next) =>{
    try {

        const latestTicket = await obj.getTheLatestTicketByUser({userId: req.user.id})
        res.json(latestTicket)
        
    } catch (error) {
        next(error)
    }
})

boletosRouter.get('/allTickets', async(req, res, next) =>{
    try{

        const allTickets = await obj.getAllTicketsOfAnSpecificUser({userId: req.user.id})
        res.json(allTickets)

    } catch(error){
        next(error)
    }
})


module.exports = boletosRouter