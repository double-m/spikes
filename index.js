var express = require('express')
  , bodyParser = require('body-parser')
  , os = require('os')
  , MongoClient = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID;

var app = express()
  , webServerPort = 3000
  , mongoUrl = 'mongodb://localhost:27017/course';

app.use(express.static('./public'));

app.use( bodyParser.json() );

app.get('/todos', function(req, res, next) {
    var db = app.locals.db;
    
    var cursor = db.collection('todos').find();
    
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
    
    var db = app.locals.db;
    db.collection('todos').insert({
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
    
    var db = app.locals.db;
    db.collection('todos').update({
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

MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;

    app.locals.db = db;

    app.listen(webServerPort, function() {
        console.log('web server started on port', webServerPort);
    });
});