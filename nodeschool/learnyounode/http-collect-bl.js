var http = require('http')
  , bl = require('bl');

http.get(process.argv[2], function(response) {
  var collection = '';

  response.pipe(bl(function (err, data) {
    if (err)
      return console.err('Error:', err);

    console.log(data.length);
    console.log(data.toString());
  }));

  response.on('error', console.error);
});

