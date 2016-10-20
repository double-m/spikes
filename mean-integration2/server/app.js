const express = require('express');

app = express();

app.get('/', function(request, response) {
  var db = app.locals.db;

  var cursor = db.collection('fixtures').find({'key': {$eq: 'greetingMessage'}});

  cursor.toArray(function(err, fixtures) {
    if (err) {
      response.send('No greeting message from MongoDB');
    } else {
      response.send(fixtures[0].message);
    }
  });
});

module.exports = app;