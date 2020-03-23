var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = 'covid19zim Dashboard. Near-real time statistics and information about the COVID-19 in Zimbabwe.';
  var title_main = 'covid19zim Dashboard.';
  var title_sub = 'Near-real time statistics and information about the COVID-19 in Zimbabwe.';
  res.render('index', { title: title, title_main: title_main, title_sub: title_sub  });
});

module.exports = router;
