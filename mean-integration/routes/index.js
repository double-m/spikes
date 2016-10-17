var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/app', express.static('./client/public'));

router.get('/', function(req, res) {
  res.redirect(301, '/app');
});

router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Hello World', subtitle: 'Express APIs' });
});


module.exports = router;
