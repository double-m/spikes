var express = require('express')
  , router = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

router.get('/', isAuthenticated, function(req, res) {
  res.render('admin', { title: 'Hello Admin', subtitle: 'back-office' });
});

module.exports = router;
