var MongoClient = require('mongodb').MongoClient;
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }), cors());

var uri = "mongodb://Chris:meme@studentstuff-shard-00-00-qyuqj.gcp.mongodb.net:27017,studentstuff-shard-00-01-qyuqj.gcp.mongodb.net:27017,studentstuff-shard-00-02-qyuqj.gcp.mongodb.net:27017/test?ssl=true&replicaSet=studentstuff-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
  const collection = client.db("test").collection("devices");
  require("./src/routes")(app, client);
  app.listen(8000, () => {
    console.log("Listening on port " + 8000);
  });
  client.close();
});