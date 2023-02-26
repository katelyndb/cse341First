const dotenv = require("dotenv");
dotenv.config()


const { MongoClient } = require ('mongodb');

async function main() {
   
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.njj0t01.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);

    try{
        await client.connect();
        await listDatabases(client);
        await listContacts(client);
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
    
}

main().catch(console.error);

async function createListing(client, newListing) {
   const result = await client.db("cse341first").collection("contacts").insertOne(newListing);
   console.log(`New Listing created with the following id: ${result.insertedId}`);
}


async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases");
    databasesList.databases.forEach(db =>{
        console.log(`- ${db.name}`);
    })
}

async function listContacts(client) {
    //const contactsList = await client.db("cse341first").collection("contacts").find().forEach(printjson);
}