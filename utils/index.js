var mcache = require('memory-cache');

const SECONDS_IN_A_DAY = 86400; // 1 day
const SECONDS_10 = 10; //10 seconds
const MILLISECONDS_1000 = 1000; // 1 second
const TOKEN_URL = "/?token";

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
  }
};
