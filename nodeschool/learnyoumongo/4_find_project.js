var mongo = require('mongodb').MongoClient
  , url = 'mongodb://localhost:27017/learnyoumongo'
  , inputAge = parseInt(process.argv[2]);


mongo.connect(url, function(err, db) {
    if (err) throw err;

    db.collection('parrots').find({
        age: {
            $gt: inputAge
        }
    }, {
        name: 1
      , age: 1
      , _id: 0

    }).toArray(function(err, documents) {
        if (err) throw err;

        console.log(documents);

        db.close();
    });
});

