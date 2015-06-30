var http = require('http')
  , fs = require('fs')
  , async = require('async');

var urlFile = process.argv[2];

async.waterfall([

  function(done) {

    fs.readFile(urlFile, function (err, data) {
      if (err) done(err);

      done(null, data.toString());
    });
  },

  function(url, done) {
    http.get(url, function (response) {
      var body = '';

      response.on('data', function(chunk) {
        body += chunk.toString();
      });

      response.on('end', function() {
        done(null, body);
      })
    }).on('error', function(err) {
      done(err);
    });
  }

], function(err, data) {
  if (err) return console.error(err);

  console.log(data);
});
