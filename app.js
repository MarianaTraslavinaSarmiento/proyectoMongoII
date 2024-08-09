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

const express = require('express');
const peliculasRouter = require("./src/routes/peliculas.routes");
const boletosRouter = require("./src/routes/boletos.routes");
const asientosRoutes = require("./src/routes/asientos.routes");
const app = express()


const config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST
}

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res)=>{
    res.send('Hello World!')
})

app.use('/peliculas', peliculasRouter)
app.use('/boletos', boletosRouter)
app.use('/asientos', asientosRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Error interno del servidor',
    });
});

app.listen(config.port, config.host, () => {
    console.log(`Server listening at http://${config.host}:${config.port}`)
})

