const { ObjectId } = require('mongodb')

const checkExists = async (collection, query, errorMessage,db) => {
    const item = await db.collection(collection).findOne(query);

    if (!item) {
        throw {
            error: 404,
            message: `No se encontró el elemento en la colección ${collection}`
        }
    }
    
    return item;


};

module.exports = checkExists