var async = require('async')
  , http = require('http')
  , url = process.argv[2]
  , requestBody = ''
  , count = 0;

function getHttpString(callback) {
  var body = '';

  http.get(url, function(res) {
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      requestBody = body;
      callback(null);
    });
  }).on('error', function(err) {
    callback(err);
  });
}

async.whilst(
  function () {
    return !/meerkat/.test(requestBody.trim());
  },
  function (callback) {
    count++;
    getHttpString(callback);
  },
  function (err) {
    console.log(count);
  }
);

