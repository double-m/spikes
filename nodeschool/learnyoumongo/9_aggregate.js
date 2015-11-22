var MongoClient = require('mongodb').MongoClient
  , url = 'mongodb://localhost:27017/learnyoumongo'
  , collectionName = 'prices'
  , size = process.argv[2];

MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var collection = db.collection(collectionName);
    collection.aggregate([{
        $match: {
            size: size
        }
    }, {
        $group: {
            _id: 'average_price_of_' + size + '_id'
          , average: {
                $avg: '$price'
            }
        }
    }]).toArray(function(err, results) {
        if (err) throw err;

        var firstRoundedResult = results[0].average.toFixed(2);
        console.log(firstRoundedResult);

        db.close();
    });

});
