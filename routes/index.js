const admin = require('firebase-admin');
var express = require('express');
var mcache = require('memory-cache');

var router = express.Router();
let db = admin.firestore();

const SECONDS_IN_A_DAY = 86400; // 1 day
const SECONDS_10 = 10; //10 seconds
const MILLISECONDS_1000 = 1000; // 1 second 

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * MILLISECONDS_1000);
        res.sendResponse(body)
      }
      next()
    }
  }
};

/* GET home page. */
router.get('/', cache(SECONDS_IN_A_DAY), function(req, res, next) {
  var title = 'Covid19Zim Aggregator | Near-real time statistics and information about the COVID-19 in Zimbabwe.';
  var title_sub = 'Near-real time statistics and information about the COVID-19 in Zimbabwe.';
  var title_hastags = '#Covid19Zim #FlattenTheCurve #StayHomeSaveLives';
  var title_main = 'Coronavirus COVID-19 Cases in Zimbabwe.';
  res.render('index', { title: title, title_main: title_main, title_sub: title_sub, title_hastags: title_hastags  });
});

// Check cache keys
router.get('/caches/view', function(req, res, next){
  console.log("View caches");
  var cache_keys = mcache.keys();
  res.send(`Cache keys - ${cache_keys}`);
  });

// Check cache json
router.get('/caches/json', function(req, res, next){
  console.log("View caches json");
  res.json(mcache.exportJson());
  });

// Flush cache
router.get('/caches/delete', function(req, res, next){
  console.log("Flush caches");
  mcache.clear();
  res.send("Cache cleared");
  });

// Get cahce size
router.get('/caches/size', function(req, res, next){
    console.log("View cache size");
    var cache_size = mcache.size();
    res.send(`Cache size - ${cache_size}`);
    });

// Serve simple page with timestamp cached for 5 seconds
router.get('/caches/test/',
  cache(SECONDS_10), // cache entry will live 10000 seconds
  function (req, res)  {
    console.log ("Test 10 second cache.");

    var currTime = new Date();
    res.send("Date and time: " + currTime);
});   
//Add
// let docRef = db.collection('stats').doc('consts1');

// let setAda = docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });


//Fetch all stats documents under stats collections
router.get('/api/v1/fetch_all_stats', function (req, res) {
  console.log("HTTP Get Request");
  var docs_dict = {};
  db.collection('stats').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      docs_dict[doc.id] = doc.data()
    });
    res.json(docs_dict);
    return
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });		  
});

// Function to return single document from a specified collection
const getData = async (collection, document) =>  {
  const doc = await db.doc(`${collection}/${document}`).get();
  const data = doc.data();
  if (!data) {
    console.error('Collection or Document does not exist');
    return;
  };
  return data;
};

//Fetch single stats document
router.get('/api/v1/fetch_stats', async function (req, res) {
  console.log("HTTP Get Request");

  res.json(await getData('stats','stats'))
    return
});

//Fetch single consts document
router.get('/api/v1/fetch_consts', async function (req, res) {
  console.log("HTTP Get Request");

  res.json(await getData('consts','consts1'))
    return
});

module.exports = router;
