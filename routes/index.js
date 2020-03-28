const admin = require('firebase-admin');
var express = require('express');
var router = express.Router();
let db = admin.firestore();


/* GET home page. */
router.get('/', function(req, res, next) {
  var title = 'Covid19Zim Aggregator | Near-real time statistics and information about the COVID-19 in Zimbabwe.';
  var title_sub = 'Near-real time statistics and information about the COVID-19 in Zimbabwe.';
  var title_hastags = '#Covid19Zim #FlattenTheCurve #StayHomeSaveLives';
  var title_main = 'Coronavirus COVID-19 Cases in Zimbabwe.';
  res.render('index', { title: title, title_main: title_main, title_sub: title_sub, title_hastags: title_hastags  });
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
  var docs_array = [];
  db.collection('stats').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      //console.log(doc.id, '=>', doc.data());
      docs_array.push(doc.id, '=>', doc.data());
    });
    res.json(docs_array);
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
