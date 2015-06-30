var http = require('http')
  , async = require('async');

var url1 = process.argv[2]
  , url2 = process.argv[3];

function fetchUrl(url, done) {
  http.get(url, function(response) {
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

async.series({

  'requestOne': function(done) {
    fetchUrl(url1, done);
  },

  'requestTwo': function(done) {
    fetchUrl(url2, done);
  }

}, function(err, data) {
  if (err) return console.error(err);

  console.log(data);
});
