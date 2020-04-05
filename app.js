var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressSession = require('express-session');
var logger = require('morgan');
var ejs = require('ejs');
var sslRedirect = require('heroku-ssl-redirect');
const { ensureLoggedIn } = require('connect-ensure-login');
const passport = require('passport');
const { Strategy, email } = require('passport-zero');
const db = require('./db');

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
let firebase_db = admin.firestore();

passport.use(
  new Strategy(
    {
      secret: 'zero cat', //  Mandatory string, used to sign tokens
      deliver: email({
        // Or create a .env file with the following variables
        // For further information on smtp configuration check https://github.com/eleith/emailjs
        user: process.env.smtpServerUser,
        from: process.env.smtpServerFrom,
        password: process.env.smtpServerPassword,
        port: process.env.smtpServerPort,
        host: process.env.smtpServerHost,
        ssl: false
      })
    },
    email => db.users.findByEmail(email)
  )
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await db.users.findById(id);
  cb(null, user);
});

// Load Express Framework i.e. Create a new Express application
var app = express();


// Expose static files
app.use('/scripts/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));
app.use('/scripts/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.use('/scripts/fa', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/')));
app.use(express.static('public'));

// Use application-level middleware for common functionality, including logging, parsing, and session handling.

// Parse HTTP request body
app.use(bodyParser.json());

app.use(logger('dev'));

// To use 'req.body' -- to parse 'application/json' content-type
app.use(express.json());

// Use 'req.body' -- to parse 'application/x-www-form-urlencoded' content-type
app.use(express.urlencoded({ extended: true }));

// Parse HTTP request cookies
app.use(cookieParser());

app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
);


// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Example of adding a new document to Firebase
// recall that a collection has 0 or more documents
// let docRef = firebase_db.collection('stats').doc('consts1');

// let setAda = docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });

// Enable SSL redirect
app.use(sslRedirect([
  // 'other',
  // 'development',
  'production'
  ]));

// View engine setup (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Import routers
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');
var cachesRouter = require('./routes/caches');

// Mount routers
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', apiRouter);
app.use('/', cachesRouter);



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
