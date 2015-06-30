var async = require('async')
  , http = require('http')
  , url = process.argv[2];

function getHttpNumber(memo, item, callback) {
  var getNumber = ''
    , path = url + '?number=' + item;

  http.get(path, function(res) {
    res.on('data', function(chunk) {
      getNumber += chunk;
    });
    res.on('end', function() {
      return callback(null, memo + Number(getNumber));
    });
  }).on('error', function(err) {
    callback(err);
  });
}

async.reduce(['one', 'two', 'three'], 0, function(memo, item, callback) {
  process.nextTick(function() {
    getHttpNumber(memo, item, callback);
  });

}, function(err, result) {
    console.log(result);
});
