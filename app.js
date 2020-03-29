var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var ejs = require('ejs');
var sslRedirect = require('heroku-ssl-redirect');

const admin = require('firebase-admin');

// Load environment variables from a .env file into process.env
require('dotenv').config() 

// Initialise Firebase using Service Account JSON
// let serviceAccount = require('./serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// Initialise Firebase using env variables - useful for heroku deploy
admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // sanitize the read private key by replacing \\n characters with \n.
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
  }),
});

// Handle to Firebase DB
let db = admin.firestore();

// Load Express Framework
var app = express();

// Parse HTTP request body
app.use(bodyParser.json()); 

// Example of adding a new document to Firebase
// recall that a collection has 0 or more documents
// let docRef = db.collection('stats').doc('consts1');

// let setAda = docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });

// Import Index router
var indexRouter = require('./routes/index');

// Expose bootstrap
app.use('/scripts/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));
app.use('/scripts/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));

// Enable SSL redirect
app.use(sslRedirect([
  'other',
  'development',
  'production'
  ]));


// View engine setup (ejs)
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
