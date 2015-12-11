var express = require('express')
  , MongoClient = require('mongodb').MongoClient;

var app = express()
  , webServerPort = 3000
  , mongoUrl = 'mongodb://localhost:27017/course';

app.use(express.static('./public'));

app.get('/todo', function(req, res, next) {
    var db = app.locals.db;
    
    var cursor = db.collection('todo').find();
    
    cursor.toArray(function(req, todos) {
        res.send(todos);  
    });
});

MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;

    app.locals.db = db;

    app.listen(webServerPort, function() {
        console.log('web server started on port', webServerPort);
    });
});