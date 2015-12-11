var MongoClient = require('mongodb').MongoClient
  , app = require('./server/app');

var mongoUrl = 'mongodb://localhost:27017/course'
  , webServerPort = 3000;

MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;

    app.locals.db = db;

    app.listen(webServerPort, function() {
        console.log('web server started on port', webServerPort);
    });
});