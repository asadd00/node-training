import { MongoClient } from 'mongodb';

let client = null;
let db = null;

export async function connectDB() {
  try {
    if(db) return db;

    client = new MongoClient(process.env.DB_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('MongoDB connected');
    
    return db;
  } catch (error) {
    console.log(error);
    db = null;
    client = null;
    throw error;
  }
}

const getClient = () => client;

export async function closeDB() {
    try {
        if(client) {
            await client.close();
            console.log('MongoDB connection closed');
        }
    } catch (error) {
        console.log(error);
    }

    client = null;
    db = null;
}