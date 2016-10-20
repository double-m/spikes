const express = require('express')
    , bodyParser = require('body-parser')
    , os = require('os');

app = express();

app.use(bodyParser.json());

app.get('/', function(request, response){
  var cursor = app.locals.db.collection('fixtures').find({'key': {$eq: 'greetingMessage'}});

  cursor.toArray(function(err, fixtures) {
    if (err) {
      response.send('No greeting message from MongoDB');
    } else {
      response.send(fixtures[0].message);
    }
  });
});

app.get('/api/products', function(request, response) {
  var cursor = app.locals.db.collection('products').find({});

  cursor.toArray(function(err, products) {
    if (err) throw err;

    response.send(products);
  });
});

app.post('/api/products', function(request, response) {
  var product = request.body.product;

  if (!product) {
      var outputMessage = 'not inserted new product: ' + product + os.EOL;
      response.status(400).send(outputMessage);
      console.log(outputMessage);
      return false;
  }

  app.locals.db.collection('products').insert({
      product: product
  }, function(err, result) {
      if(err) throw err;

      var outputMessage = 'stored a new product: "' + product + '"' + os.EOL;
      response.status(201).send(outputMessage);
      console.log(outputMessage);
  });

});

module.exports = app;