var http = require('http')
  , fs = require('fs')
  , port = process.argv[2]
  , file = process.argv[3];

http.createServer(function (request, response) {
  response.writeHead(200, { 'content-type': 'text/plain' });

  fs.createReadStream(file).pipe(response);
}).listen(port);
