var duplexer2 = require('duplexer2')
  , spawn = require('child_process').spawn;

module.exports = function (cmd, args) {
    var spawned = spawn(cmd, args);

    return duplexer2(spawned.stdin, spawned.stdout);
}
