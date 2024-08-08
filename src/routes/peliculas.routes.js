const { ObjectId } = require("mongodb");
const Pelicula = require("../modules/peliculas");
const express = require('express')
const peliculasRouter = express.Router()

peliculasRouter.get('/', async (req, res, next) => {
    try {
        const obj = new Pelicula();
        const peliculas = await obj.getAllAvailableMovies();
        res.send(peliculas);
    } catch (error) {
        next(error)
    }
});

peliculasRouter.get('/detalles_peliculas/:id', async (req, res, next) => {
    try {
        const obj = new Pelicula();
        const pelicula = await obj.getAllDetailsOfAMovie({ id: req.params.id });
        res.send(pelicula);
    } catch (error) {
        next(error)
    }
})

module.exports = peliculasRouter

