const Client = require("./config/mongodb");
const Asiento = require("./modules/asientos");
const Boleto = require("./modules/boletos");
const Pago = require("./modules/pagos");
const Pelicula = require("./modules/peliculas");
const Proyeccion = require("./modules/proyecciones");
const Sala = require("./modules/salas");
const TarjetaVIP = require("./modules/tarjetasVIP");
const Usuario = require("./modules/usuarios");



// const STANDARD_USER = process.env.STANDARD_USER
// const STANDARD_PWD = process.env.STANDARD_PWD
// const juan = new Client(STANDARD_USER,STANDARD_PWD) 

async function main(){

    let obj

    // obj = new Pelicula()
    // console.log(await obj.getAllAvailableMovies())
    // console.log(await obj.getAllDetailsOfAMovie(
    //     {
    //         id:"66a0510bf034045fab9999d1"
    //     }
    // ));

    obj = new Proyeccion()
    console.log(await obj.getSeatsByScreening(
        {
            screeningId: "66a05c73f034045fab999a25"
        }
    ))

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

    // console.log(await obj.cancelBooking(
    //     {
    //         ticketId: "66a52c38b7b76ac1964d2e67"
    //     }
    // ));

    // obj = new Asiento()
    // console.log(await obj.availabilityForEachScreening({id: "66a05c73f034045fab999a25"}));


    // obj = new Proyeccion()
    // console.log(await obj.getAllTheProjectionsByMovieAndDate(
    //     {
    //         movieId: "66a0510bf034045fab9999d1",
    //         date: "2024-07-30"
    //     }
    // ));
    
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


}

main()


