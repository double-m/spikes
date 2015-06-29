var http = require('http')
  , url = require('url')
  , port = process.argv[2]
  , apiUsage = 'The following APIs are the only allowed:\n\
    GET: /api/parsetime?iso=2013-08-10T12:10:15.474Z\n\
    GET: /api/unixtime?1376136615474';

function parsetime(date) {
  return JSON.stringify({
    hour:   date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  });
}

function unixtime(date) {
  return JSON.stringify({
    unixtime: date.getTime()
  });
}

http.createServer(function (request, response) {
  if (request.method != 'GET')
    writeError(apiUsage + '\n', 404);

  var parsedUrl = url.parse(request.url, true);

  var date = new Date(parsedUrl.query.iso)
    , result;

  if (parsedUrl.pathname !== '/api/parsetime' && parsedUrl.pathname !== '/api/unixtime')
    writeError(apiUsage + '\n', 404);

  if (! parsedUrl.query.iso)
    writeError(apiUsage + '\n', 400);

  if (isNaN(date.getTime()))
    writeError(apiUsage + '\n');

  if (parsedUrl.pathname === '/api/parsetime')
    result = parsetime(date);
  else
    result = unixtime(date);

  if (result) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(result);
  } else {
     writeError(apiUsage + '\n');
  }

  function writeError(errorMessage, errorCode) {
    if (! errorCode)
      errorCode = 500;
    response.writeHead(errorCode);
    response.end(errorMessage);
  }
}).listen(port);

