const assert = require("assert");
let OBjectID = require("mongodb").ObjectID;
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../envorment.json");

module.exports = function(app, db) { 
    app.get('/test', (req, res) => {
        console.log("asd")
    })
}