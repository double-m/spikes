var MongoClient = require('mongodb').MongoClient
  , dbName = process.argv[2]
  , url = 'mongodb://localhost:27017/' + dbName
  , username = 'tinatime'
  , newAge = 40;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var users = db.collection('users');
    users.update({
        username: username
    }, {
        $set: {
            age: newAge
        }
    }, function(err) {
        if (err) throw err;

        db.close();
    });
});
