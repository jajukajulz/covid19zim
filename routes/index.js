const admin = require('firebase-admin');
var express = require('express');

var router = express.Router();
var cache = require('express-redis-cache')();


let db = admin.firestore();

const SECONDS_IN_A_DAY = 86400;
const SECONDS_1000 = 1000;

/* GET home page. */
router.get('/', cache.route({
    expire: {
    200: SECONDS_IN_A_DAY,
    404: 10,
    403: 5000,
    500: 10,
    xxx: 1
  }
}), (req, res, next) => {
    var title = 'Covid19Zim Aggregator | Near-real time statistics and information about the COVID-19 in Zimbabwe.';
    var title_sub = 'Near-real time statistics and information about the COVID-19 in Zimbabwe.';
    var title_hastags = '#Covid19Zim #FlattenTheCurve #StayHomeSaveLives';
    var title_main = 'Coronavirus COVID-19 Cases in Zimbabwe.';
    res.render('index', { title: title, title_main: title_main, title_sub: title_sub, title_hastags: title_hastags,
  });
});

router.get('/caches/view', function(req, res, next){
  console.log("View caches");
  cache.get(function (error, entries) {
    if ( error ) throw error;
  
    entries.forEach(console.log.bind(console));
  });
});

router.get('/caches/delete', function(req, res, next){
  console.log("Flush caches");
  cache.del( '*', next);
  });


router.get('/caches/size', function(req, res, next){
    console.log("View cache size");
    cache.size( );
    });

// Serve simple page with timestamp cached for 5 seconds
router.get('/caches/test/:skip_cache?',
  cache.route({ expire: 10000  }), // cache entry will live 10000 seconds
  function (req, res)  {
    console.log ("Test 10 second cache. If you add skip_cache param then cache disabled");
  	if (req.params.skip_cache) {
  		res.use_express_redis_cache = false;
  		console.log ("Cache disabled on this request");
  	}

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
