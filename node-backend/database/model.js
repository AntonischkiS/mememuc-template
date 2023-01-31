// const MONGODB_PORT = process.env.DB_PORT || '27017';
// var mongoose = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-ws2223`);
var mongoose = require('mongoose');

const schema = mongoose.Schema;

const User = mongoose.model('User', new schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
    }
));

module.exports = User;