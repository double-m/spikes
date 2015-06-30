var http = require('http')
  , async = require('async');

function fetchUrl(url, done) {
  http.get(url, function (response) {
    response.on('data', function(chunk) {
    });

    response.on('end', function() {
      return done();
    })
  }).on('error', function(err) {
    return done(err);
  });
}

async.each(process.argv.slice(2), fetchUrl, function(err) {
  if (err) return console.log(err);
});
