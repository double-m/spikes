var MongoClient = require('mongodb').MongoClient
  , dbName = process.argv[2]
  , collectionName = process.argv[3]
  , id = process.argv[4]
  , url = 'mongodb://localhost:27017/' + dbName;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var collection = db.collection(collectionName);
    collection.remove({
        _id: id
    }, function(err) {
        if (err) throw err;

        db.close();
    });
});
