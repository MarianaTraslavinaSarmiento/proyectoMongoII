


const checkExists = async (collection, query, errorMessage) => {
    const item = await db.collection(collection).findOne(query);
    if (!item) throw new Error(errorMessage);
    return item;
};

try {
    const screenExist = await checkExists('proyecciones', 
        {_id: new ObjectId(proyeccion_id)}, 
        `La proyección con id ${proyeccion_id} no existe.`
    );

    const userExist = await checkExists('usuarios', 
        {_id: new ObjectId(usuario_id)}, 
        `El usuario con id ${usuario_id} no existe.`
    );

    const seatExist = await checkExists('asientos', 
        {numero_asiento: codigo_asiento}, 
        `El asiento con código ${codigo_asiento} no existe. Verifique si está en el formato específico: (ej: A1)`
    );

    // Continuar con el resto de la lógica...
} catch (error) {
    return { error: error.message };
}