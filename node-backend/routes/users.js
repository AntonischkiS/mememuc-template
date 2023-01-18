var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const db = req.db;
  const users = db.get('users');
  users.find({username: req.username},{ projection: {basicauthtoken: 0} }) // return all user properties, except the basic auth token
      .then((docs) => res.json(docs))
      .catch((e) => res.status(500).send())
});
router.post('/users', function(req, res, next) {
  console.log(req.body);
  res.status(200);
})
module.exports = router;
