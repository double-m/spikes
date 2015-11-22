var MongoClient = require('mongodb').MongoClient
  , url = 'mongodb://localhost:27017/learnyoumongo'
  , firstName = process.argv[2]
  , lastName = process.argv[3];

MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var docs = db.collection('docs')
      , newObject = {
        firstName: firstName,
        lastName: lastName
    };
 
    docs.insert(newObject, function(err, data) {
        if (err) throw err;

        console.log(JSON.stringify(newObject));

        db.close();
    });
});
