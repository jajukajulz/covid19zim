var express = require('express');
var router = express.Router();
var passport = require('passport');
const { ensureLoggedIn } = require('connect-ensure-login');


// Render Login page.
router.get(
  '/login/:message?',
  (req, res) =>
    req.params.message ? res.render('message') : res.render('login')
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
  res.render('profile', { user: req.user })
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
