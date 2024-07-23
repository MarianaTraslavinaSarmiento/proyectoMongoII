import { MongoClient } from 'mongodb';

class Client{
  constructor(user, pass){
    this.uri = process.env.MONGO_SCHEME + user + ":" + pass + process.env.MONGO_URI + "/" + process.env.DB_NAME;
    console.log(this.uri);
  }

  getClient(){
      return new MongoClient( this.uri, {
        connectTimeoutMS: 5000, 
        socketTimeoutMS: 30000,  
      });
  }

}

export default Client;