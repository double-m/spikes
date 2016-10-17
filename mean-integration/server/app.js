var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var clientRoutes = require('./routes/client');
var serverRoutes = require('./routes/api');
var adminRoutes = require('./routes/admin');
var loginRoutes = require('./routes/login');

var app = express();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , credentials = require('./secret/credentials');

var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/app', clientRoutes);
app.use('/api', serverRoutes);
app.use('/admin', adminRoutes);
app.use('/login', loginRoutes);
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});app.get('/', function(req, res) {
  res.redirect(301, '/app');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {

    if (username !== credentials.username || password !== credentials.password) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    return done(null, {
      id:       credentials.id,
      username: credentials.username
    });
  }
));
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  if (id === credentials.id) {
    cb(null, { id: id, username: credentials.username });
  }
});

module.exports = app;