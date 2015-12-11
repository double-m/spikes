var app = require('../server/app')
  , supertest = require('supertest')
  , MongoClient = require('mongodb').MongoClient
  , expect = require('chai').expect;
  
var mongoTestUrl = 'mongodb://localhost:27017/todos-test';

describe('api test', function() {
    var request;

    before(function(done) {
       MongoClient.connect(mongoTestUrl, function(err, db) {
           if (err) return done(err);

           app.locals.db = db;
           request = supertest(app);
           done();
       });
    });
   
    beforeEach(function(done) {
       app.locals.db.collection('todos').remove(done);
    });
   
    it('should retrieve an empty list of todos', function(done) {
       request.get('/todos').expect(200, [], done);
    });
});