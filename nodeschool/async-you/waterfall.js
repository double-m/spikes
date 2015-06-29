var http = require('http')
  , fs = require('fs')
  , async = require('async');

var urlFile = process.argv[2];

async.waterfall([

  function(cb) {

    fs.readFile(urlFile, function (err, data) {
      if (err) cb(err);

      cb(null, data.toString());
    });
  },

  function(url, cb) {
    http.get(url, function (response) {
      var body = '';

      response.on('data', function(chunk) {
        body += chunk.toString();
      });

      response.on('end', function() {
        cb(null, body);
      }).on('error', function(err) {
        cb(e);
      });
    });
  }

], function(err, data) {
  if (err) return console.error(err);

  console.log(data);
});
