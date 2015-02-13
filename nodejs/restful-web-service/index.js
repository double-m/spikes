var http = require('http')
  , url = require('url')
  , server
  , itemCounter = 0
  , items = [];

server = http.createServer(function(req, res){
    function getIndexFromId(id) {
      return items.map(function(item){
        return item.id;
      }).indexOf(id);
    }

    function displayItem(index) {
      return items[index].id + ') ' + items[index].name + '\n';
    }
      
    switch (req.method) {

    case 'POST':

      var item = '';

      req.setEncoding('utf8');
      req.on('data', function(chunk){
        item += chunk;
      });
      req.on('end', function(){
        ++itemCounter;
        items.push({id: itemCounter, name: item});
        onPostEnd(itemCounter);
      });

      function onPostEnd(id) {
        res.end(displayItem(getIndexFromId(id)));
      }
      
      break;

    case 'GET':

      var body;

      body = items.map(function(item, index){
        return displayItem(index);
      }).join('');

      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;

    case 'DELETE':

      var path = url.parse(req.url).pathname
        , id = parseInt(path.slice(1), 10)
        , index;

      if(isNaN(id)) {
        res.statusCode = 400;
        res.end('Invalid item ID\n');
        break;
      }

      index = getIndexFromId(id);
      
      if(index === -1) {
        res.statusCode = 404;
        res.end('Item not found\n');
        break;
      }

      items.splice(index, 1);

      res.end('OK\n');

    default:

      res.statusCode = 405;
      res.end();
  }
});

server.listen(3000);

