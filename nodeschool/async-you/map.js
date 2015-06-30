var http = require('http')
  , async = require('async');

function fetchUrl(url, done) {
  var body = '';

  http.get(url, function (response) {
    response.on('data', function(chunk) {
      body += chunk.toString();
    });

    response.on('end', function() {
      return done(null, body);
    })
  }).on('error', function(err) {
    return done(err);
  });
}

async.map(process.argv.slice(2), fetchUrl, function(err, data) {
  if (err) return console.log(err);

  console.log(data);
});
