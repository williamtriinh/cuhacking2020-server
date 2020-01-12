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
        await collection.findOne({ name: 'jim' }, (err, results) => {
            console.log(results)
            console.log(err)
            res.send({ res: "back" })
        })
        console.log("asd")
    })

    app.post('/login', (req, res) => {
        console.log(req.body.username);
        console.log(req.body.pass);
        //gets info
        const collection = db
        .db("jeff")
        .collection("users");
        collection.findOne({ username: (req.body.username) }, (err, result) => { //checks
            if((req.body.pass)=== result.password){
                var privateKey = fs.readFileSync('private.key');
                var token = jwt.sign({ username: result.username }, privateKey, { algorithm: 'RS256'});
                console.log(token);
                res.send(token);
            }else{
                console.log("Your password does not match your username")
            }
            res.send({ res: "works" });
        })
    })
};