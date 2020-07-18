require('dotenv').config()
const Mongo = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

class Connection{

    constructor() {
        this.init = this.initConnection();
    }

    async initConnection(){
        const options = { poolSize: 50,
            keepAlive: 15000,
            socketTimeoutMS: 15000,
            connectTimeoutMS: 15000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        try{
            const connection = await Mongo.connect(process.env.MONGODB_PAYMENT_URL, options);
            return connection.db('PaymentDB');
        } catch (error) {
            console.log("Error connected to DB, \n Err : ", error);
        }
    }

    async getConnection(collection, data){
        console.log('Collection : ', collection, ' | ', 'Data : ', data)
        let db = await this.init;
        if(data.type === 'insertOne'){
           return await db.collection(collection).insertOne(data.data);
        } else if(data.type === 'updateOne'){
            return await db.collection(collection).updateOne({ idPayment : data.data.idPayment }, {$set : data.data}, { upsert: false })
        }
    }

}

module.exports = Connection;
