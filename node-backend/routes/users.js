var express = require('express');
var router = express.Router();

const {User} = require("../database/model");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   const db = req.db;
//   console.log("Connected to database")
//   const users = db.get('users');
//   users.find({username: req.username},{ projection: {basicauthtoken: 0} }) // return all user properties, except the basic auth token
//       .then((docs) => res.json(docs))
//       .catch((e) => res.status(500).send())
// });
router.post('/', function (req, res, next) {
    const db = req.db;
    const users = db.get('users');

    users.find({username: req.username}) // return all user properties, except the basic auth token
        .then((docs) => res.json(docs))
        .catch((e) => res.status(500).send())
})
module.exports = router;
