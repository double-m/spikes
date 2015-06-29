var http = require('http');

http.get(process.argv[2], function(response) {
  var collection = '';

  response.setEncoding('utf-8');
  response.on('data', function(data) {
    collection += data;
  });

  response.on('end', function() {
    console.log(collection.length);
    console.log(collection);
  });

  response.on('error', console.error);
});
