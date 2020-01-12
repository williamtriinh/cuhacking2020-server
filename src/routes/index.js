const assert = require("assert");
let OBjectID = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");
// const { JWT_KEY } = require("../../envorment.json");

module.exports = function(app, db) { 
    app.post('/test', async (req, res) => {
        console.log(req.body)
        // console.log(req)
        const collection = db
        .db("jeff")
        .collection("users");
        await collection.findOne({name: 'jim'}, (err, results) => {
            console.log(results)
            console.log(err)
            res.send({res: "back"})
        })
        console.log("asd")
    })

    app.post('/login', (req, res) => {
        console.log(req.body.username)
        console.log(req.body.password)
        //gets info
        const collection = db
        .db("jeff")
        .collection("users");
        await collection.findOne({username: 'jim'}, (err, result) => { //checks
        console.log(result)
        res.send({res:"works"})
    })
})
};