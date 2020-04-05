const admin = require('firebase-admin');
var express = require('express');
const utils = require('./../utils');
var passport = require('passport');
var router = express.Router();

let db = admin.firestore();

/* GET home page. */
// we use passport.authenticate('zero')  middleware will check for token and if found, set req.user
router.get('/',
    [passport.authenticate('zero', { failureRedirect: '/' }),
    utils.cache.cacheMiddleware(utils.cache.SECONDS_IN_A_DAY)],
    function(req, res, next) {
  req.user ? console.log("req.user is set") : console.log("req.user is not set");
  var title = 'Covid19Zim Aggregator | Near-real time statistics and information about the COVID-19 in Zimbabwe.';
  var title_sub = 'Near-real time statistics and information about the COVID-19 in Zimbabwe.';
  var title_hastags = '#Covid19Zim #FlattenTheCurve #StayHomeSaveLives';
  var title_main = 'Coronavirus COVID-19 Cases in Zimbabwe.';
  res.render('index', { title: title, title_main: title_main, title_sub: title_sub, title_hastags: title_hastags  });
});

module.exports = router;
