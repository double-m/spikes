var combine = require('stream-combiner')
  , split = require('split')
  , through = require('through2')
  , zlib = require('zlib');

module.exports = function () {
    var genre;

    var groupByGenre = through(write, end);

    return combine(
        split(),
        groupByGenre,
        zlib.createGzip()
    );

    function write (json, _, next) {
        if (json.length === 0) return next();

        var obj = JSON.parse(json);

        if(obj.type === 'genre') {
            if (genre) {
                this.push(JSON.stringify(genre) + '\n');
            }
            genre = { name: obj.name, books: [] };
        } else if (obj.type === 'book') {
            genre.books.push(obj.name);
        }

        next();
    }

    function end (done) {
        this.push(JSON.stringify(genre) + '\n');

        done();
    }
}
