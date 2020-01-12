var MongoClient = require('mongodb').MongoClient;
const express = require("express");
const bodyParser = require("body-parser");
const main = require("./src/routes");

const app = express();

app.use(bodyParser.json());

var port = 8000;
var uri = "mongodb+srv://Chris:meme@studentstuff-qyuqj.gcp.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, { useNewUrlParser: true }, (err, database) => {
  console.log(err)
  console.log(database)
  if (err) {
    console.log("error")
  } else {
    main(app, database);
    app.listen(port, () => {
      console.log(port)
      console.log("Listening on port " + port);
    });
  }
});
