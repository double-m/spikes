var express = require('express');

var app = express();

app.get('/search', function(req, res) {
  var queryObj = req.query;
  
  res.send(queryObj);
});

app.listen(process.argv[2]);

