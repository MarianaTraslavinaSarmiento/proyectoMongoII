const { ObjectId } = require("mongodb");
const Proyeccion = require("../modules/proyecciones");
const express = require('express')
const functionRoutes = express.Router()

functionRoutes.post('/:id/:date', async(req, res, next)=>{

    try{
        const obj = new Proyeccion();
        const {movieId, date} = req.body
        const proyecciones = await obj.getAllTheProjectionsByMovieAndDate({movieId, date});
        res.send(proyecciones);
    }catch(error){
        next(error);
    }
})

