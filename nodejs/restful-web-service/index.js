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
    
    function getIndexFromUrl(url) {

      var path = url.parse(req.url).pathname
        , id = parseInt(path.slice(1), 10)
        , index;

      if(isNaN(id)) {
        return {'index': false, err: {status: 400, message: 'Invalid item ID\n'}};
      }

      index = getIndexFromId(id);

      if(index === -1) {
        return {'index': false, err: {status: 404, message: 'Item not found\n'}};
      }
      
      return {'index': index, err: {}};
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
        res.end(displayItem(getIndexFromId(itemCounter)));
      });
      
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

      var parsedUrl = getIndexFromUrl(url)
        , item = '';

      if (parsedUrl.err.status) {
        res.statusCode = parsedUrl.err.status;
        res.end(parsedUrl.err.message);
        break;
      }

      items.splice(parsedUrl.index, 1);

      res.end('OK\n');

    case 'PUT':

      var parsedUrl = getIndexFromUrl(url)
        , item = '';

      if (parsedUrl.err.status) {
        res.statusCode = parsedUrl.err.status;
        res.end(parsedUrl.err.message);
        break;
      }

      req.setEncoding('utf8');
      req.on('data', function(chunk){
        item += chunk;
      });
      req.on('end', function(){
        items[parsedUrl.index].name = item;
        res.end(displayItem(parsedUrl.index));
      });
      
      break;
      
    default:

      res.statusCode = 405;
      res.end();
  }
});

server.listen(3000);

