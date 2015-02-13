var http = require('http')
  , server
  , items = [];

server = http.createServer(function(req, res){
  switch (req.method) {
    case 'POST':
      req.setEncoding('utf8');
      var item = '';
      req.on('data', function(chunk){
        item += chunk;
      });
      req.on('end', function(){
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'GET':
      res.end();
      break;
    default:
      res.statusCode = 405;
      res.end();
  }
});

server.listen(3000);

