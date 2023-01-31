var express = require('express');
var router = express.Router();
var User = require( '../database/model');

//TODO add registration

// router.get('/', function(req, res, next) {
//   const db = req.db;
//   console.log("Connected to database")
//   const users = db.get('users');
//   users.find({username: req.username},{ projection: {basicauthtoken: 0} }) // return all user properties, except the basic auth token
//       .then((docs) => res.json(docs))
//       .catch((e) => res.status(500).send())
// });
router.post('/', async function (req, res/*, next*/) {
    const body = req.body;
    // const newUser = new User({username:body.name, password:body.password});
    // await User.insertMany(newUser);
    // console.log("Inserted new user")
    //TODO add mail for 3rd party authentication
    User.findOne({username: body.name}, {}) // return all user properties, except the basic auth token
        .then((user) => {
            res.json(user);
        })
        .catch((e) => res.status(500).send(e));
})

module.exports = router;
