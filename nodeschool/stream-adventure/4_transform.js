var through = require('through2')
  , tr = through(write);

function write (buffer, _, next) {
    this.push(buffer.toString().toUpperCase());
    next();
}

process.stdin.pipe(tr).pipe(process.stdout);
