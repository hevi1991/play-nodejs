const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
// Collection Name
const collcetionName = 'user'

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    let userCollection = db.collection(collcetionName)

    userCollection.insertOne({name: "Peter", age: 18})

    userCollection.insertMany([{name: "Peter", age: 19}, {name: "Peter", age: 19}, {name: "Peter", age: 19}])

    userCollection.find().toArray((err, docs) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(docs)
    })

    client.close();
});