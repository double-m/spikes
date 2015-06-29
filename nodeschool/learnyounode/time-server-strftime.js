var net = require('net')
  , strftime = require('strftime');

function zeroPad2(num) {
  return (num < 10 ? '0' : '') + num;
}

function now() {
  var date = new Date()

  return strftime('%F %R', new Date());
}

var server = net.createServer(function (socket) {
  socket.end(now() + '\n');
}).listen(process.argv[2]);

