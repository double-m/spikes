var app = require('../server/app')
  , supertest = require('supertest')
  , MongoClient = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID
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
        app.locals.db.collection('todos').insert({
            '_id': ObjectID('0123456789AB'),
            task: 'dummy task',
            completed: false
        });
    });
   
    it('should store a new task', function(done) {
        request.post('/todos')
            .send({ task: 'test task' })
            .expect(201, [], done);
    });

    it('should retrieve an existing task', function(done) {
        request
            .get('/todos')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);

                expect(res.body).to.be.an.array;
                expect(res.body.length).to.equal(1);
                expect(res.body[0].task).to.equal('dummy task');

                done();
            });
    });

    it('should delete an existing task', function(done) {
        request.delete('/todos/0123456789AB').end(function(err, res) {
            if(err) return done(err);

            expect(res.status).to.equal(200);

            done();
        });
    });

    it('should set an existing task as completed', function(done) {
        request
            .put('/todos/0123456789AB')
            .send({ todo: { completed: true } } )
            .end(function(err, res) {
                if(err) return done(err);

                expect(res.status).to.equal(200);

                done();
            });
    });
});