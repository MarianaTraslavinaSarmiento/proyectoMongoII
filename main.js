
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

// obj = new Pelicula()
// console.log(await obj.getAllAvailableMovies())
// console.log(await obj.getAllDetailsOfAMovie(
//     {
//         id:"66a0510bf034045fab9999d1"
//     }
//     ));

obj = new Boleto()
// console.log(await obj.buyTickets(
//     [
//         {
//             proyeccion_id: "66a05c73f034045fab999a25",
//             usuario_id: "66a05449f034045fab9999e6",
//             codigo_asiento: "A1"
//         }
//     ],
//     "en efectivo"
// ));

console.log(await obj.bookingSeats(
    [
        {
            proyeccion_id: "66a05c73f034045fab999a26",
            usuario_id: "66a05449f034045fab9999ec",
            codigo_asiento: "B1"
        }
    ],
));

// obj = new Asiento()
// console.log(await obj.availabilityForEachScreening({id: "66a05c73f034045fab999a25"}));