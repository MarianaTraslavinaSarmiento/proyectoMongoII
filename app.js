
const { ObjectId } = require("mongodb");
const Client = require("./src/config/mongodb");
const Asiento = require("./src/modules/asientos");
const Boleto = require("./src/modules/boletos");
const Pago = require("./src/modules/pagos");
const Pelicula = require("./src/modules/peliculas");
const Proyeccion = require("./src/modules/proyecciones");
const Sala = require("./src/modules/salas");
const TarjetaVIP = require("./src/modules/tarjetasVIP");
const Usuario = require("./src/modules/usuarios");

const express = require('express')
const app = express()
const port = 5001

const config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST
}


app.get('/', (req, res)=>{
    res.send('Hello World!')
})

app.get('/peliculas', async (req, res, next) => {
    try {
        const obj = new Pelicula();
        const peliculas = await obj.getAllAvailableMovies();
        res.json(peliculas);
    } catch (error) {
        next(error)
    }
});

app.get('/peliculas/:id', async (req, res, next) => {
    try {
        const obj = new Pelicula();

        if (!ObjectId.isValid(req.params.id)){
           const error = new Error('El id de la película es inválido')
           error.status = 400
           throw error
        }

        const pelicula = await obj.getAllDetailsOfAMovie({ id: req.params.id });
        res.json(pelicula);
    } catch (error) {
        next(error)
    }
})


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Error interno del servidor',
    });
});

app.listen(config.port, config.host, () => {
    console.log(`Server listening at http://${config.host}:${config.port}`)
})

