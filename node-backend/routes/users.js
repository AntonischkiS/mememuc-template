var express = require('express');
var router = express.Router();

const {User} = require("../database/model");
/* GET users listing. */
router.get('/', function(req, res, next) {
  const db = req.db;
  console.log("Connected to database")
  const users = db.get('users');
  users.find({username: req.username},{ projection: {basicauthtoken: 0} }) // return all user properties, except the basic auth token
      .then((docs) => res.json(docs))
      .catch((e) => res.status(500).send())
});
router.post('/users', function(req, res, next) {
  const db = req.db;
  const users = db.get('users');
  const u = new User(req.body);
  users.insert(u); // save the user to the database when logging in. This is only to test the database. TODO: still not working

  res.status(200).send();
  users.find({username: req.username},{ projection: {basicauthtoken: 0} }) // return all user properties, except the basic auth token
      .then((docs) => {
        console.log(docs + " User inserted");
        res.json(docs)})
      .catch((e) => res.status(500).send())
})
module.exports = router;
