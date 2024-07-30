
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


// const STANDARD_USER = process.env.STANDARD_USER
// const STANDARD_PWD = process.env.STANDARD_PWD
// const juan = new Client(STANDARD_USER,STANDARD_PWD) 

// obj = new Pelicula(juan)
// console.log(await obj.getAllAvailableMovies())
// console.log(await obj.getAllDetailsOfAMovie(
//     {
//         id:"66a0510bf034045fab9999d1"
//     }
//     ));

// obj = new Boleto()
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

// console.log(await obj.bookingSeats(
//     [
//         {
//             proyeccion_id: "66a05c73f034045fab999a26",
//             usuario_id: "66a05449f034045fab9999ec",
//             codigo_asiento: "B1"
//         }
//     ],
// ));

// console.log(await obj.cancelBooking("66a52c38b7b76ac1964d2e67"));

// obj = new Asiento()
// console.log(await obj.availabilityForEachScreening({id: "66a05c73f034045fab999a25"}));



// obj = new Usuario(juan)
// console.log(await obj.createUsers({
//     nombre: "Cristian",
//     email: "cristian@gmail.com",
//     telefono: "3244195352",
//     tipo: "vip",
//     nick: "cristian"
// }));

// console.log(await obj.showDetailsOfASpecificUser("66a05449f034045fab9999e6"));


// console.log(await obj.updateRoleOfUsers(
//         {
//             id: "66a05449f034045fab9999ec",
//             tipo: "vip"
//         }
// ));

// console.log(await obj.getAllUsersAndFilterByRole({
//     userId: "66a05449f034045fab9999ed",
//     tipo: "estandar"
// }));

