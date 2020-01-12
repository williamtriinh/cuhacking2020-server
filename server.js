var MongoClient = require('mongodb').MongoClient;
const express = require("express");
const bodyParser = require("body-parser");
const main = require("./src/routes");

const app = express();

app.use(bodyParser.json());


var uri = "mongodb+srv://Chris:meme@studentstuff-qyuqj.gcp.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, { useNewUrlParser: true }, (err, database) => {
  if (err) {
    console.log("error")
  } else {
    main(app, database);
    app.listen(8000, () => {
      console.log("Listening on port " + 8000);
    });
  }
});