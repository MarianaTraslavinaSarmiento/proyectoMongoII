const express = require('express')
const { ObjectId } = require('mongodb')
const Asiento = require('../modules/asientos')
const asientosRoutes = express.Router()




asientosRoutes.get('/:id/disponibilidad', async(req, res, next)=>{
    try{ 
        let obj = new Asiento

        const asientosDisponibles = await obj.availabilityForEachScreening({ id: req.params.id })
        res.send(asientosDisponibles)
    
    }catch(error){
        next(error)
    }
})

asientosRoutes.get('/occupied/:proyeccion_id', async(req, res, next)=>{
    try{ 

        let obj = new Asiento
        console.log(req.params)
        const ocupados = await obj.getOccupied(req.params.proyeccion_id)
        res.send(ocupados)
    
    }catch(error){
        next(error)
    }
})
module.exports = asientosRoutes