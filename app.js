var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var ejs = require('ejs');
var sslRedirect = require('heroku-ssl-redirect');

// Load Firebase Credentials
const admin = require('firebase-admin');
let serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Create Friebase db handle
let db = admin.firestore();

// Load Express Framework
var app = express();

// Load Redis cache. Cache entries don't expire unless otherwise specified.
// e.g. 60 seconds var cache = require('express-redis-cache')({ expire: 60 });
var cache = require('express-redis-cache')();

app.use(bodyParser.json()); //need to parse HTTP request body

// 1 collection has 0 or more documents
let docRef = db.collection('stats').doc('consts1');

let setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

// Import Index router
var indexRouter = require('./routes/index');


// Expose bootstrap
app.use('/scripts/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));
app.use('/scripts/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));

// Enable ssl redirect
app.use(sslRedirect([
  'other',
  'development',
  'production'
  ]));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
