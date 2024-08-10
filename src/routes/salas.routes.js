const express = require('express')
const { ObjectId } = require('mongodb')
const Sala = require('../modules/salas')
const salasRoutes = express.Router()

salasRoutes.get('/asientos/:id', async(req, res, next) => {
    try{ 
        const obj = new Sala()
        const sala = await obj.seatsOfEachRoom({ id: req.params.id })
        res.status(200).send(sala)
    
    }catch(error){
        next(error)
    }
})

module.exports = salasRoutes;

