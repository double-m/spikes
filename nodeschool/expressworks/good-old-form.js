var express = require('express')
  , bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/form', function(req, res) {
  res.end('<form><input name="str"/></form>')
});

app.post('/form', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end(req.body.str.split('').reverse().join(''));
});

app.listen(process.argv[2]);

