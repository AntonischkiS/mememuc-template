const MONGODB_PORT = process.env.DBPORT || '27017';
var monk = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-ws2223`);

const User = monk.get('User');
// , new Collection({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// }
module.exports = { User };