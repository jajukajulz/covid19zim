const admin = require('firebase-admin');
var express = require('express');
const utils = require('../utils');

var router = express.Router();
let firebase_db = admin.firestore();

//Fetch all stats documents under stats collections
router.get('/api/v1/fetch_all_stats', function (req, res) {
  console.log("HTTP Get Request");
  var docs_dict = {};
  firebase_db.collection('stats').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      docs_dict[doc.id] = doc.data();
    });
    res.json(docs_dict);
    return;
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
});

// Function to return single document from a specified collection
const getData = async (collection, document) =>  {
  console.log("[getData] - Not yet cached");
  const doc = await firebase_db.doc(`${collection}/${document}`).get();
  const data = doc.data();
  if (!data) {
    console.error('Collection or Document does not exist');
    return;
  };
  return data;
};

//Fetch single stats document
router.get('/api/v1/fetch_stats', utils.cache.cacheMiddleware(utils.cache.SECONDS_IN_A_DAY), async function (req, res) {
  // console.log("HTTP Get Request");

  res.json(await getData('stats','stats'));
    return;
});


module.exports = router;
