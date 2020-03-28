var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var ejs = require('ejs');
var sslRedirect = require('heroku-ssl-redirect');

const admin = require('firebase-admin');
let serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

var app = express();

app.use(bodyParser.json()); //need to parse HTTP request body

//1 collection has 0 or more documents


var indexRouter = require('./routes/index');


// expose bootstrap
app.use('/scripts/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));
app.use('/scripts/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));

// enable ssl redirect
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
