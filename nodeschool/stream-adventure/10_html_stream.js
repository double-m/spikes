var trumpet = require('trumpet')
  , through = require('through2');

var trump = trumpet();

var toUpper = through(function (buffer, _, next) {
    this.push(buffer.toString().toUpperCase());
    next();
});

var loudStream = trump.select('.loud').createStream();
loudStream.pipe(toUpper).pipe(loudStream);

process.stdin.pipe(trump).pipe(process.stdout);
