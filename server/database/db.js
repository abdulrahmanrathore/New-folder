import mongoose from "mongoose";




const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-u5hgjlp-shard-00-00.4zib4pn.mongodb.net:27017,ac-u5hgjlp-shard-00-01.4zib4pn.mongodb.net:27017,ac-u5hgjlp-shard-00-02.4zib4pn.mongodb.net:27017/?ssl=true&replicaSet=atlas-m6rwza-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Database connected successfully...');
    } catch(error){
        console.log('Error while connecting with the database', error);
    }
}

export default Connection;