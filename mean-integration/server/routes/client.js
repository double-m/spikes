var express = require('express')
  , router = express.Router();

router.use('/', express.static('./client/public'));

module.exports = router;
