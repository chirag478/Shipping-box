const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const hexRgb = require('hex-rgb');
const cors = require('cors');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://api-user:qBZ1UWQvXQ0onYBg@cluster0.zzjt8.mongodb.net/rest-api?retryWrites=true&w=majority';

//create a MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let collection = null;

//Eastablish connection to MongoDB
client.connect(err => {
    if (err) {
        console.log(`Error while connecting to Mongo => ${err.errmsg}`);
    }
    console.log("connected to MongoDB");
    collection = client.db("rest-api").collection("items");
});

// perform actions on the collection object
app.post('/create-order', async (req, res) => {

    const data = {
        name: req.body.name,
        weight: req.body.weight,
        color: hexRgb(req.body.color, { format: 'css' }),
        country: req.body.country,
        cost: req.body.cost
    };

    try {
        await collection.insertOne(data)
        console.log("Inserted 1 document");
        res.send("OK").status(200);
    } catch (err) {
        console.log(err);
        res.send(err).status(500)
    }
})

app.get("/get-orders", async (req, res) => {
    try {
        const data = [];
        const cursor = await collection.find()

        await cursor.forEach(doc => {
            console.log(doc);
            data.push(doc)
        })
        res.send(data).status(200)
    } catch (err) {
        console.log(err);
        res.send(err).status(500)
    }
})

//close mongo connection
client.close();

//Listem to port 3000
app.listen(PORT, () => {
    console.log(`server is listen on localhost:${PORT}`);
})
