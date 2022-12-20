const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('../config/config.js')
/**
 * Fetches the database and the collections.
 */

///// PARAMETERS
const {mongodb_uri, db_name, collections} = config.mongodb
////////////////////

const model = {}

MongoClient
    .connect(mongodb_uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
        model.db = client.db(db_name);
        collections.forEach(k => {
            model[k] = model.db.collection(k)
        })

        model.testsets.createIndex({testset: 1})
        console.log("[+] Fetched MongoDB database and collections")
    })


module.exports = model