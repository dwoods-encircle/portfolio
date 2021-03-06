var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var app = express();
var express = require('express');
var router = express.Router();

//app.use(favicon(path.join(__dirname, 'public', 'assets/favicon.ico')));
app.use(logger('dev'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});

// ROUTING

var publicPath = path.resolve(__dirname, 'public');
// We point to our static assets
app.use(express.static(publicPath));

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
    res.json({
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


module.exports = app;