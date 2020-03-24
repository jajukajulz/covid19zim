var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = 'Covid19Zim | Near-real time statistics and information about the COVID-19 in Zimbabwe.';
  var title_sub = 'Near-real time statistics and information about the COVID-19 in Zimbabwe.';
  var title_hastags = '#Covid19Zim #FlattenTheCurve #StayHomeSaveLives';
  var title_main = 'Coronavirus COVID-19 Cases in Zimbabwe.';
  res.render('index', { title: title, title_main: title_main, title_sub: title_sub, title_hastags: title_hastags  });
});

module.exports = router;
