
import { ObjectId } from "mongodb";



export const checkExists = async (collection, query, errorMessage,db) => {
    const item = await db.collection(collection).findOne(query);
    if (!item) throw new Error(errorMessage);
    return item;
};
