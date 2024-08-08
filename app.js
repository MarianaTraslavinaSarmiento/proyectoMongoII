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


const config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST
}


app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res)=>{
    res.send('Hello World!')
})

app.get('/peliculas', async (req, res, next) => {
    try {
        const obj = new Pelicula();
        const peliculas = await obj.getAllAvailableMovies();
        res.send(peliculas);
    } catch (error) {
        next(error)
    }
});

app.get('/detalles_peliculas/:id', async (req, res, next) => {
    try {
        const obj = new Pelicula();

        if (!ObjectId.isValid(req.params.id)){
           const error = new Error('El id de la película es inválido')
           error.status = 400
           throw error
        }

        const pelicula = await obj.getAllDetailsOfAMovie({ id: req.params.id });
        res.send(pelicula);
    } catch (error) {
        next(error)
    }
})

app.post('/comprar_boleto', async (req, res, next) => {
    try {
        const obj = new Boleto();
        const { ticket, metodo_pago } = req.body;

        if (!ticket ||!metodo_pago){
            const error = new Error('Los parámetros de compra deben ser proporcionados')
            error.status = 400
            throw error
        }

        const metodosPagoPermitidos = ["en efectivo", "mastercard", "tarjeta credito VISA", "tarjeta debito VISA"]
        if (!metodosPagoPermitidos.includes(metodo_pago)){
            const error = new Error('El método de pago no es válido')
            error.status = 400
            throw error
        }
        
        if(!ticket.usuario_id || !ticket.proyeccion_id || !ticket.codigo_asiento){
            const error = new Error('El ticket debe tener los parametros requeridos para que la compra sea válida')
            error.status = 400
            throw error
        }

        const result = await obj.buyTicket({ticket, metodo_pago});
        res.send(result);
    } catch (error) {
        next(error)
    }
})

app.get('/disponibilidad_asientos/:id', async(req, res, next)=>{
    try{

        let obj = new Asiento
        const asientosDisponibles = await obj.availabilityForEachScreening({ id: req.params.id })
        res.send(asientosDisponibles)
    
    }catch(error){
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

