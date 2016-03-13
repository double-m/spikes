var http = require('http')
  , through = require('through2');

function toUpper (buffer, _, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

http.createServer(function (req, res) {
    if (req.method === 'POST') {
        req.pipe(through(toUpper)).pipe(res);
    }
}).listen(process.argv[2]);
