var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

// // ##### IMPORTANT
// // ### Your backend project has to switch the MongoDB port like this
// // ### Thus copy paste this block to your project
// const MONGODB_PORT = process.env.DB_PORT || '27017';
// const db = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-ws2223`); // connect to database omm-2021
// console.log(`Connected to MongoDB at port ${MONGODB_PORT}`)
// // ######
var app = express();

/**
 * Database initial setup
 */
mongoose.connect("mongodb://127.0.0.1:27017/omm-ws2223", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 1000
}).then(()=> {
    console.log("Connected to Mongoose at " +mongoose.connection.port);
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error "));


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

// app.use(function(req,res,next){  req.db = db;
//   next();
// });

// the login middleware. Requires BasicAuth authentication
// app.use((req,res,next) => {
//   const users = db.get('users');
//   users.findOne({basicauthtoken: req.headers.authorization}).then(user => {
//     if (user) {
//       req.username = user.username;  // test test => Basic dGVzdDp0ZXN0
//       next()
//     }
//     else {
//       res.set('WWW-Authenticate', 'Basic realm="401"')
//       res.status(401).send()
//     }
//   }).catch(e => {
//     console.error(e)
//     res.set('WWW-Authenticate', 'Basic realm="401"')
//     res.status(401).send()
//   })
// })

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
