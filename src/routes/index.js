const assert = require("assert");
let OBjectID = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");
// const { JWT_KEY } = require("../../envorment.json");

module.exports = function(app, db) { 
    app.get('/test', (req, res) => {
        console.log(req.body)
        console.log("asd")
        res.send({res: "back"})
    })
    app.post('/login', (req, res) => {
        console.log(req.body.user)
        res.send({res:"works"})
    })
};