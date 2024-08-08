const { ObjectId } = require("mongodb");
const Client = require("../config/mongodb");
const DbService = require("../db/dbConection");

class Pelicula {
    staticPelicula;
    adminClient;
    adminDbService;
    constructor(client = null) {
        if (Pelicula.instancePelicula) {
            return Pelicula.instancePelicula;
        }
        client
            ? (this.adminClient = client.getClient())
            : (this.adminClient = new Client(
                process.env.ADMIN_USER,
                process.env.ADMIN_PWD
            ).getClient());
        this.adminDbService = new DbService(this.adminClient);
        Pelicula.instancePelicula = this;
    }

    /**
     * Este método recupera todas las películas disponibles de la base de datos. Realiza una operación de agregación de canalización para recuperar proyecciones relacionadas y información de sala.
     * @returns {Promesa<Matriz|Objeto>} - Una Promesa que se resuelve a una matriz de objetos de películas con sus proyecciones. Si se produce un error durante el proceso, se resuelve a un objeto de error.
     * @throws {Error} - Lanza un error si la conexión a la base de datos falla o si se produce un error durante la operación de agregación.
     */

    async getAllAvailableMovies() {
        try {
            const db = await this.adminDbService.connect();

            const moviesAvailable = await db
                .collection("peliculas")
                .aggregate([
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
                                $first: "$titulo",
                            },
                            generos: {
                                $first: "$generos",
                            },
                            duracion_min: {
                                $first: "$duracion_min",
                            },
                            clasificacion: {
                                $first: "$clasificacion",
                            },
                            proyecciones: {
                                $push: "$proyecciones",
                            },
                        },
                    },
                ])
                .toArray();

            return moviesAvailable;
        } catch (error) {
            return { error: error.name, message: error.message };
        } finally {
            await this.adminDbService.close();
        }
    }

    /**
     * Recupera información detallada de una película específica de la base de datos.
     * Realiza una operación de agregación de canalización para recuperar proyecciones relacionadas y información de la sala.
     *
     * @param {Object} params - El objeto de parámetros.
     * @param {string} params.id - El identificador único de la película.
     *
     * @returns {Promise<Object|Array>} - Una Promesa que se resuelve a un objeto que contiene detalles de la película con sus proyecciones.
     * Si la película no existe, se resuelve a un objeto de error.
     * Si se produce un error durante el proceso, se resuelve a un objeto de error.
     *
     * @throws {Error} - Lanza un error si la conexión a la base de datos falla o si se produce un error durante la operación de agregación.
     */
    async getAllDetailsOfAMovie({ id }) {

        if (!ObjectId.isValid(id)){
            const error = new Error('El id de la película es inválido')
            error.status = 400
            throw error
        }

        const db = await this.adminDbService.connect();

        const moviesDetails = await db
            .collection("peliculas")
            .aggregate([
                {
                    $match: { _id: new ObjectId(id) },
                },
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
                    },
                },

                {
                    $group: {
                        _id: "$_id",
                        titulo: {
                            $first: "$titulo",
                        },
                        generos: {
                            $first: "$generos",
                        },
                        duracion_min: {
                            $first: "$duracion_min",
                        },
                        sinopsis: {
                            $first: "$sinopsis",
                        },
                        clasificacion: {
                            $first: "$clasificacion",
                        },
                        proyecciones: {
                            $push: "$proyecciones",
                        },
                    },
                },
            ])
            .toArray();

            if (moviesDetails.length === 0) {
                const error = new Error(`La pelicula con id ${id} no existe`)
                error.status = 404
                throw error
            }

        return moviesDetails[0];
    }

    
}

module.exports = Pelicula;
