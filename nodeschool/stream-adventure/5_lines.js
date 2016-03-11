var through = require('through2')
  , split = require('split')
  , isOddLine = true;

function tr (buffer, _, next) {
    var formattedLine = isOddLine ? buffer.toString().toLowerCase() : buffer.toString().toUpperCase();
    console.log(formattedLine);
    isOddLine = !isOddLine;
    next();
}

process.stdin
    .pipe(split())
    .pipe(through(tr))
    .pipe(process.stdout);
