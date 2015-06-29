var net = require('net');

function zeroPad2(num) {
  return (num < 10 ? '0' : '') + num;
}

function now() {
  var date = new Date()

  return date.getFullYear() +
    '-' +
    zeroPad2(date.getMonth()+1) +
    '-' +
    zeroPad2(date.getDate()) +
    ' ' +
    zeroPad2(date.getHours()) +
    ':' +
    zeroPad2(date.getMinutes());
}

var server = net.createServer(function (socket) {
  socket.end(now() + '\n');
}).listen(process.argv[2]);

