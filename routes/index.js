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
  res.render('index', { title: utils.consts.SITE_TITLE, title_main: utils.consts.SITE_TITLE_MAIN, title_sub: utils.consts.SITE_TITLE_SUB, title_hastags: utils.consts.SITE_TITLE_HASHTAGS, user:req.user  });
});

module.exports = router;
