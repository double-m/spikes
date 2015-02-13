var http = require('http')
  , url = require('url')
  , server
  , items = [];

server = http.createServer(function(req, res){
  switch (req.method) {

    case 'POST':

      var item = '';

      req.setEncoding('utf8');
      req.on('data', function(chunk){
        item += chunk;
      });
      req.on('end', function(){
        items.push(item);
        onPostEnd(item);
      });

      function onPostEnd(item) {
        res.end(items.indexOf(item) + ') ' + item + '\n');
      }

      break;

    case 'GET':

      var body;

      body = items.map(function(item, id){
        return id + ') ' + item;
      }).join('\n').concat('\n');

      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"')
      res.end(body);
      break;

    case 'DELETE':

      var path = url.parse(req.url).pathname
        , id = parseInt(path.slice(1), 10);

      if(isNaN(id)) {
        res.statusCode = 400;
        res.end('Invalid item ID\n');
        break;
      }

      if(!items[id]) {
        res.statusCode = 404;
        res.end('Item not found\n');
        break;
      }

      items.splice(id, 1);

      res.end('OK\n');

    default:

      res.statusCode = 405;
      res.end();
  }
});

server.listen(3000);

