const assert = require("assert");
let OBjectID = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");
// const { JWT_KEY } = require("../../envorment.json");

module.exports = function (app, db) {
    app.post('/test', async (req, res) => {
        console.log(req.body)
        // console.log(req)
        const collection = db
            .db("jeff")
            .collection("users");
        collection.findOne({ name: 'jim' }, (err, results) => {
            console.log(results)
            console.log(err)
            res.send({ res: "back" })
        })
    })

    // {
    //     "name": "Henry Morrs",
    //     "password": "meme",
    //     "username": "user",
    //     "location": "Ottawa, Ontario"
    // }
    app.post('/register', async (req, res) => {
        const collection = db
            .db("jeff")
            .collection("users");

        const { name, password, username, location } = req.body;

        try {
            if (name.length <= 0 || location.length <= 0 || password.length <= 0 || name == undefined || length == undefined || password == undefined) {
                res.send({ error: "Invalid Body" })
                return
            }
        } catch (err) {
            res.send({ error: "Invalid Body" })
            return
        }
        collection.findOne({ username: username }, (err, result) => {
            console.log(result)
            if (err || result != null) {
                res.send({ error: "Error username taken" })
                return
            }
            collection.insertOne({ name: name, username: username, password: password, location: location }, async (err, result) => {
                if (err) {
                    res.send({ error: "Could not add user" })
                } else {
                    res.send({ valid: "created user" })
                }
            });
        });
    });

    app.get('/addClassToUser', (req, res) => {
        const collection = db
            .db("jeff")
            .collection("users");
        jwt.verify(req.body.token, 'meme', function (err, decoded) {
            console.log(decoded.foo) // bar
        });
    })

    app.post('/login', (req, res) => {
        console.log(req.body.username);
        console.log(req.body.pass);
        //gets info
        const collection = db
            .db("jeff")
            .collection("users");
        collection.findOne({ username: (req.body.username) }, (err, result) => { //checks
            if ((req.body.password) === result.password) {
                var token = jwt.sign({ username: result.username }, 'meme');
                console.log(token);
                res.send({ token: token });
            } else {
                res.send({ error: "Invalid Login" });
            }
        })
    })
};