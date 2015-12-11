/* global module, app */

var express = require('express')
  , bodyParser = require('body-parser')
  , os = require('os')
  , ObjectID = require('mongodb').ObjectID;

var app = express();

app.use(express.static('./public'));

app.use( bodyParser.json() );

app.get('/todos', function(req, res, next) {
    var cursor = app.locals.db.collection('todos').find();
    
    cursor.toArray(function(req, todos) {
        res.send(todos);  
    });
});

app.post('/todos', function(req, res, next) {
    var task = req.body.task;
    
    if (!task) {
        outputMessage = 'not inserted new task: ' + task + os.EOL;
        res.status(400).send(outputMessage);
        console.log(outputMessage);
        return false;
    }
    
    app.locals.db.collection('todos').insert({
        task: task,
        completed: false
    }, function(err, result) {
        if(err) throw err;
        outputMessage = 'stored a new task: "' + task + '"' + os.EOL;
        res.status(201).send(outputMessage);
        console.log(outputMessage);
    });
});

app.put('/todos/:id', function(req, res, next) {
    var todo = req.body.todo
      , id = req.params.id;
    
    if (!todo) {
        outputMessage = 'not updated task: ' + todo + os.EOL;
        res.status(400).send(outputMessage);
        console.log(outputMessage);
        return false;
    }
    
    app.locals.db.collection('todos').update({
        _id: new ObjectID(id)
    }, {
        $set: {
            completed: todo.completed
        }
    }, function(err, result) {
        if(err) throw err;
        outputMessage = 'completed flag on task "' + id + '" has been set to ' + todo.completed + os.EOL;
        res.status(200).send(outputMessage);
        console.log(outputMessage);
    });
});

app.delete('/todos/:id', function(req, res, next) {
    var id = req.params.id;

    app.locals.db.collection('todos').remove({
        _id: new ObjectID(id)
    }, function(err, result) {
        if(err) throw err;
        outputMessage = 'deleted task "' + id + '"' + os.EOL;
        res.status(200).send(outputMessage);
        console.log(outputMessage);
    });
});

module.exports = app;