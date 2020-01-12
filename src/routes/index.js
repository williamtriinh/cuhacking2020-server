const assert = require("assert");
let OBjectID = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");
// const { JWT_KEY } = require("../../envorment.json");

module.exports = function (app, db) {
    console.log("working")
    app.post('/test', async (req, res) => {
        console.log(req.body)
        // // console.log(req)
        // const collection = db
        //     .db("jeff")
        //     .collection("users");
        // collection.findOne({ name: 'jim' }, (err, results) => {
        //     console.log(results)
        //     console.log(err)
        //     res.send({ res: "back" })
        // })
        res.send({ valid: "test endpoint working" })
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

        const { name, password, username, location, email } = req.body;

        try {
            if (email.length <= 0 || name.length <= 0 || password.length <= 0 || name == undefined || password == undefined || email == undefined) {
                res.send({ error: "Invalid Body" })
                return
            }
        } catch (err) {
            console.log('error')
            console.log(err)
            res.send({ error: "Invalid Body" })
            return
        }
        collection.findOne({ username: username }, (err, result) => {
            console.log(result)
            if (err || result != null) {
                res.send({ error: "Error username taken" })
                return
            }
            collection.insertOne({ email: email, name: name, username: username, password: password }, async (err, result) => {
                if (err) {
                    res.send({ error: "Could not add user" })
                } else {
                    res.send({ valid: "created user" })
                }
            });
        });
    });

    app.post('/addClassToUser', (req, res) => {
        const collectionClasses = db
            .db("jeff")
            .collection("usersClasses");
        const collectionCats = db.db("jeff").collection("users");
        const { catID, name } = req.body;
        if (catID == undefined || name == undefined) {
            res.send({ error: "Invalid Body" })
            return
        }
        jwt.verify(req.body.token, 'meme', function (err, decoded) {
            console.log(decoded.username) // bar
            // collectionUsers.findOne({username: decoded.username})
            collectionCats.findOne({ catID: req.body.catID }, (err, result) => {
                if (err || result != null) {
                    res.send({ error: "Cant find category" })
                    return
                }
                collectionClasses.insertOne({ username: decoded.username, catID: catID, name: name }, (err, result) => {
                    if (err || result == null) {
                        console.log(result)
                        res.send({ error: "Failed to insert class" })
                        return
                    }
                    res.send({ valid: "added class to user " })
                })
            })
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

    // {
    //     "catID": 0
    // }
    app.get('/getCategoryUsers', async (req, res) => {
        if (req.body.catID == null) {
            res.send({ error: "Invalid Body" })
            return
        }
        const collectionUsers = db
            .db("jeff")
            .collection("users");
        const collectionClasses = db.db("jeff").collection("usersClasses");
        let classes = await collectionClasses.find({ catID: req.body.catID }).toArray()
        let users = []
        classes.map(ele => {
            let userToUpdate = users.findIndex((eleUser) => eleUser.username == ele.username);
            if (userToUpdate == -1) {
                users.push({ username: ele.username, classes: [ele.name] })
            } else {
                users[userToUpdate].classes.push(ele.name)
            }
        })
        for (let x = 0; x < users.length; x++) {
            let userData = await collectionUsers.findOne({ username: users[x].username })
            users[x] = { ...users[x], email: userData.email, name: userData.name }
        }
        res.send(users)
    })

    app.get('/getCategories', async (req, res) => {
        const collectionUsers = db
            .db("jeff")
            .collection("categories");
        let categories = await collectionUsers.find().toArray();
        console.log(categories)
        res.send(categories)
    });

    // app.get('/')
};