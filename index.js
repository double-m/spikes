var express = require('express')
  , app = express()
  , port = 3000;

app.use(express.static('./public'));

app.get('/', function(req, res, next) {

    res.send('hello');

}).listen(port, function() {
    console.log('server started on port', port);
});