const express = require('express')
const { ObjectId } = require('mongodb')
const Asiento = require('../modules/asientos')
const asientosRoutes = express.Router()


let obj = new Asiento

asientosRoutes.get('/:id/disponibilidad', async(req, res, next)=>{
    try{ 

        const asientosDisponibles = await obj.availabilityForEachScreening({ id: req.params.id })
        res.send(asientosDisponibles)
    
    }catch(error){
        next(error)
    }
})

module.exports = asientosRoutes