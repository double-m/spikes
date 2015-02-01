var net = require('net');

net.createServer(function(socket){
  socket.on('data', function(data){
    socket.write("server received: " + data);
  });
}).listen(8888);

