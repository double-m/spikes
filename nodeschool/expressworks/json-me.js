var express = require('express')
  , fs = require('fs');

var app = express();

app.get('/books', function(req, res) {
  fs.readFile(process.argv[3], function(err, data) {
    if (err) return res.sendStatus(500);

    var jsonBooks = '';
    try {
      jsonBooks = JSON.parse(data);
    } catch (e) {
      return res.sendStatus(500);
    }
    res.json(jsonBooks);
  });
});

app.listen(process.argv[2]);

