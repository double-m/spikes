var express = require('express')
  , stylus = require('stylus')
  , path = require('path');

var app = express();

app.use(require('stylus').middleware(process.argv[3]));

app.use(express.static(process.argv[3]));

app.listen(process.argv[2]);

