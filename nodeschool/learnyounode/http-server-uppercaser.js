var http = require('http')
  , map = require('through2-map')
  , port = process.argv[2];

http.createServer(function (request, response) {
  if (request.method != 'POST')
    return response.end('Only POST allowed\n');

  request.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(response);
}).listen(port);
