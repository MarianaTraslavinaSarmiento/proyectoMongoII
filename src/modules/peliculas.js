import { ObjectId } from "mongodb";
import Client from "../config/mongodb.js";
import DbService from "../db/dbConection.js";

export class Pelicula{
    staticPelicula
    adminClient;
    adminDbService;
    constructor(client=null) {
        if (Pelicula.instancePelicula) {
            return Pelicula.instancePelicula;
        }
        client ? this.adminClient = client.getClient():this.adminClient = new Client(process.env.ADMIN_USER, process.env.ADMIN_PWD).getClient();
        this.adminDbService = new DbService(this.adminClient);
        Pelicula.instancePelicula = this;
    }

    async getAllAvailableMovies(){

        try{

            const db = await this.adminDbService.connect();

            const moviesAvailable = await db.collection('peliculas').aggregate(
                [
                    {
                      $lookup: {
                        from: "proyecciones",
                        localField: "_id",
                        foreignField: "pelicula_id",
                        as: "proyecciones",
                      },
                    },
                  
                    { $unwind: "$proyecciones" },
                  
                    {
                      $lookup: {
                        from: "salas",
                        localField: "proyecciones.sala_id",
                        foreignField: "_id",
                        as: "proyecciones.sala",
                      },
                    },
                  
                    { $unwind: "$proyecciones.sala" },
                  
                    {
                      $project: {
                        "proyecciones.pelicula_id": 0,
                        "proyecciones.sala_id": 0,
                        "proyecciones.sala._id": 0,
                        sinopsis: 0,
                      },
                    },
                  
                    {
                      $group: {
                        _id: "$_id", 
                        titulo: {
                          $first: "$titulo"
                        },
                        generos: {
                          $first: "$generos"
                        },
                        duracion_min: {
                          $first: "$duracion_min"
                        },
                              clasificacion: {
                          $first: "$clasificacion"
                        },
                        proyecciones: {
                          $push: "$proyecciones"
                        }
                      }
                    }
                ]
            ).toArray()

            return moviesAvailable;

        }catch(error){
            return {error: error.name, message: error.message}
        }finally{
            await this.adminDbService.close();
        }
    }

}