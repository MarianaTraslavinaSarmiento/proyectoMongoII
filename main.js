
import Client from "./src/config/mongodb.js";
import { Asiento } from "./src/modules/asientos.js";
import { Boleto } from "./src/modules/boletos.js";
import { Pago } from "./src/modules/pagos.js";
import { Pelicula } from "./src/modules/peliculas.js";
import { Proyeccion } from "./src/modules/proyecciones.js";
import { Sala } from "./src/modules/salas.js";
import { TarjetaVIP } from "./src/modules/tarjetasVIP.js";
import { Usuario } from "./src/modules/usuarios.js";

let obj

obj = new Pelicula()
// console.log(await obj.getAllAvailableMovies())
console.log(await obj.getAllDetailsOfAMovie({id: "66a0510bf034049fab9999d1"}));