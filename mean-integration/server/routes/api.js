var express = require('express')
  , router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World', subtitle: 'Express APIs' });
});

module.exports = router;