const { ObjectId } = require("mongodb");
const Proyeccion = require("../modules/proyecciones");
const express = require('express')
const functionRoutes = express.Router()
functionRoutes.post('/pelicula', async(req, res, next)=>{

    try{
        const obj = new Proyeccion();
        const {movieId, date} = req.body
        const proyecciones = await obj.getAllTheProjectionsByMovieAndDate({movieId, date});
        res.send(proyecciones);
    }catch(error){
        next(error);
    }
})

functionRoutes.get('/:id/asientos', async(req, res, next)=>{
    try{
        const obj = new Proyeccion();
        const asientos = await obj.getSeatsByScreening({ screeningId: req.params.id });
        res.send(asientos);
    }catch(error){
        next(error);
    }
})

module.exports = functionRoutes