/* global process */

var q = require('q')
  , invalidJson = process.argv[2];

function parsePromised (json) {
    var deferred = q.defer();

    try {
        jsonObj = JSON.parse(json);
        deferred.resolve(JSON.stringify(jsonObj));
    } catch (e) {
        deferred.reject(e);
    };

    return deferred.promise;
}

parsePromised(invalidJson).then(console.log, console.log);
