var mcache = require('memory-cache');

const SECONDS_IN_A_DAY = 86400; // 1 day
const SECONDS_10 = 10; //10 seconds
const MILLISECONDS_1000 = 1000; // 1 second
const TOKEN_URL = "/?token";

const SITE_TITLE = 'Covid19Zim Information Hub | Near-real time statistics and information about the COVID-19 in Zimbabwe.';
const SITE_TITLE_SUB = 'Near-real time statistics and information about the COVID-19 in Zimbabwe.';
const SITE_TITLE_HASHTAGS = '#Covid19Zim #FlattenTheCurve #StayHomeSaveLives #WearAMask';
const SITE_TITLE_MAIN = 'Coronavirus COVID-19 Cases in Zimbabwe.';

// Memory cache middleware
var cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        if ((req.originalUrl || req.url).startsWith(TOKEN_URL)) {
          console.log("Not caching TOKEN_URL");
        } else{
          mcache.put(key, body, duration * MILLISECONDS_1000);
          }
        res.sendResponse(body);
      }
      next()
    }
  }
};

module.exports = {
  cache: {
    cacheMiddleware,
    MILLISECONDS_1000,
    SECONDS_10,
    SECONDS_IN_A_DAY
  },
  consts: {
    SITE_TITLE,
    SITE_TITLE_SUB,
    SITE_TITLE_HASHTAGS,
    SITE_TITLE_MAIN
  }
};
