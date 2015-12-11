var express = require('express')
  , MongoClient = require('mongodb').MongoClient;

var app = express()
  , webServerPort = 3000
  , mongoUrl = 'mongodb://localhost:27017/course';

app.use(express.static('./public'));

app.get('/', function(req, res, next) {
    res.send('hello');
});

MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;

    app.listen(webServerPort, function() {
        console.log('web server started on port', webServerPort);
    });
});