var duplexer2 = require('duplexer2')
  , throughObj = require('through2').obj;

module.exports = function (counter) {
    var counts = {}
      , input = throughObj(write, end);

    return duplexer2({objectMode: true}, input, counter);

    function write (obj, _, next) {
        counts[obj.country] = (counts[obj.country] || 0) + 1;
        next();
    }

    function end (done) {
        counter.setCounts(counts);
        done();
    }
}
