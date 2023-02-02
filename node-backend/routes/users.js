var express = require('express');
var router = express.Router();
var User = require('../database/model');

/**
 *Route for registration.
 * Adds a user to the database
 */
router.post('/register', async (req, res) => {
    const body = req.body;
    console.log("The user currently trying to register: ");
    console.log(req.body);
    User.insertMany({username: body.username,password:body.password}).then((user) => {
        console.log('Added user: ', user);
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).send({message:err.message});
        // res.json('User could not be registered due to this error: ', err);
    });

});

/**
 * The route for logging in
 * Searches for user in the database
 */
router.post('/login', async (req, res/*, next*/) => {
    const body = req.body;
    console.log("The user currently trying to log in: ", body);
    //TODO add mail for 3rd party authentication
    User.findOne({username: body.username}, {}) // return all user properties, except the basic auth token
        .then((user) => {
            console.log("User properties", user)
            res.json(user);
        })
        .catch((e) => res.status(500).send(e));
})

module.exports = router;
