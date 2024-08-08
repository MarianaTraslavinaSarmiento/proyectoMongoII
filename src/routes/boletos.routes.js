const { ObjectId } = require("mongodb");
const express = require('express');
const Boleto = require("../modules/boletos");
const boletosRouter = express.Router()

boletosRouter.post('/comprar_boleto', async (req, res, next) => {
    try {
        const obj = new Boleto();
        const { ticket, metodo_pago } = req.body;
        const result = await obj.buyTicket({ticket, metodo_pago});
        res.send(result);

    } catch (error) {
        next(error)
    }
})

module.exports = boletosRouter