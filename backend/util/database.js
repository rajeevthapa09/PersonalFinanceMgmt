const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectToMongo() {
    try {
        await client.connect();
        db = client.db("PersonalFinance");
        console.log("Connected to Mongodb")
    } catch (err) {
        console.error('mongo db connection failed: ', err)
    }
}

function getDb() {
    if (!db) throw new Error("Database not initialized");
    return db;
}

module.exports = {
    connectToMongo,
    getDb,
};