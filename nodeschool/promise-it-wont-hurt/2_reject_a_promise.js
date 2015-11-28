var q = require('q')
  , deferred = q.defer();

deferred.promise.then(null, function(error) {
    console.log(error.message);
});
setTimeout(deferred.reject, 300, new Error("REJECTED!"));
