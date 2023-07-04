const {MongoClient, ServerApiVersion} = require("mongodb");
const dotenv = require('dotenv');

dotenv.config()

const url = process.env.mongo_uri;

let db;

const client = MongoClient.connect(url, {
  serverApi: {
    version : ServerApiVersion.v1,
    strict: true,
    depricationErrors : true,
  }
});
const database = client.db("InsertDB")

function closeClient() {
  client.close();  
}

function saveTrackingData(data) {
  database.collection("trackingData").insertOne(data, function (err, res) {
    if (err) throw err;
    console.log("Data inserted");
  });
}

function getTrackingData(callback) {
  database.collection("trackingData")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      callback(result);
    });
}

module.exports = { saveTrackingData, getTrackingData, getClient, closeClient };
