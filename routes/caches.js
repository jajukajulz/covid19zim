var express = require('express');
var router = express.Router();
var passport = require('passport');
const { ensureLoggedIn } = require('connect-ensure-login');
var mcache = require('memory-cache');
const utils = require('./../utils');


// Check cache keys
router.get('/caches/view', ensureLoggedIn(), function(req, res, next){
  console.log("View caches");
  var cache_keys = mcache.keys();
  res.send(`Cache keys - ${cache_keys}`);
  });

// Check cache json
router.get('/caches/json', ensureLoggedIn(), function(req, res, next){
  console.log("View caches json");
  res.json(mcache.exportJson());
  });

// Flush cache
router.get('/caches/delete', ensureLoggedIn(), function(req, res, next){
  console.log("Flush caches");
  mcache.clear();
  res.send("Cache cleared");
  });

// Get cache size
router.get('/caches/size', ensureLoggedIn(), function(req, res, next){
    console.log("View cache size");
    var cache_size = mcache.size();
    res.send(`Cache size - ${cache_size}`);
    });

// Serve simple page with timestamp cached for 5 seconds
router.get('/caches/test/', [
    ensureLoggedIn(),
    utils.cache.cacheMiddleware(utils.cache.SECONDS_10)], // cache entry will live 10000 seconds
  function (req, res)  {
    console.log ("Test 10 second cache.");

    var currTime = new Date();
    res.send("Date and time: " + currTime);
});

module.exports = router;
