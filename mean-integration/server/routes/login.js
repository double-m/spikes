var express = require('express')
  , router = express.Router()
  , passport = require('passport');

router.get('/', function(req, res) {
  res.render('login', { title: 'Login' });
});

router.post('/'
  , passport.authenticate('local', { failureRedirect: '/login' })
  , function(req, res) {
    res.redirect('/admin');
  }
);

module.exports = router;
