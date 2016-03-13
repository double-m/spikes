var concat = require('concat-stream');

function writeReversed (buffer) {
    console.log(buffer.toString().split('').reverse().join(''));
}

process.stdin.pipe(concat(writeReversed));
