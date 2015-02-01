var EventEmitter = require('events').EventEmitter;
var eventEmitter = new EventEmitter();

eventEmitter.on('data', function(data) {
  console.log("eventEmitter caught event: 'data'; the message was: '" + data + "'");
});

eventEmitter.emit('data', 'hello world');

