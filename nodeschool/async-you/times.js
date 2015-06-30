var http = require('http')
  , async = require('async');

var host = process.argv[2]
  , port = process.argv[3];

var createUser = function(id, next) {
  var postData = JSON.stringify({'user_id': id+1})
    , options = {
        hostname: host,
        port: port,
        path: '/create/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length
        }
      };

  var req = http.request(options, function(res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      body += chunk.toString();
    });
    res.on('end', function() {
      next(null, body);
    });
  }).on('error', function(err) {
    next(err);
  });
  req.write(postData);
  req.end();
}

function getUsers(done) {
  var options = {
        hostname: host,
        port: port,
        path: '/users',
      }

  http.get(options, function (res) {
    var body = '';

    res.on('data', function(chunk) {
      body += chunk.toString();
    });

    res.on('end', function() {
      done(null, body);
    })
  }).on('error', function(err) {
    done(err);
  });
}

async.series({
  'createUsers': function(done) {
    async.times(5,
      function(n, next) {
        createUser(n, function(err, userResponse) {
          next(err, userResponse);
        });
      },
      function(err) {
        if (err) return done(err);
        done(null, 'userResponse');
      })
    },
  'getUsers': getUsers
}, function(err, data) {
  if (err) return console.error(err);

  console.log(data.getUsers);
});
