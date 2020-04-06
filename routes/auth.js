var express = require('express');
var router = express.Router();
var passport = require('passport');
const utils = require('./../utils');
const { ensureLoggedIn } = require('connect-ensure-login');


// Render Login page.
router.get(
  '/login/:message?',
  (req, res) =>
    req.params.message ? 
    res.render('message', { title: utils.consts.SITE_TITLE, title_main: utils.consts.SITE_TITLE_MAIN, title_sub: utils.consts.SITE_TITLE_SUB, title_hastags: utils.consts.SITE_TITLE_HASHTAGS  }) : 
    res.render('login', { title: utils.consts.SITE_TITLE, title_main: utils.consts.SITE_TITLE_MAIN, title_sub: utils.consts.SITE_TITLE_SUB, title_hastags: utils.consts.SITE_TITLE_HASHTAGS  })
);

// request token - Process Login form submission
router.post(
  '/auth/zero',
  passport.authenticate('zero', {
    action: 'requestToken',
    failureRedirect: '/login'
  }),
  (req, res) => res.redirect('/login/message')
);

// Render Profile page.
router.get('/profile', ensureLoggedIn(), (req, res) =>
  res.render('profile', { user: req.user, title: utils.consts.SITE_TITLE, title_main: utils.consts.SITE_TITLE_MAIN, title_sub: utils.consts.SITE_TITLE_SUB, title_hastags: utils.consts.SITE_TITLE_HASHTAGS })
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;


