var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var SessionStore = require('express-mysql-session');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var sqlManager = require('./database/SqlManager');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//mysql
sqlManager.init();

//session
var storeOptions = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'life_blog',
  schema: {
    tableName: 'session',
    columnNames: {
      guid: 'custom_session_id',
      cookie: 'custom_expires_column_name'
    }
  }
};

var sessionStore = new SessionStore(storeOptions);
app.use(session({
  key: 'life_blog',
  secret: 'life_blog_secret',
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}));

//flash
app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use(function(req, res, next){
  console.log("app.usr local");
  res.locals.user = req.session.user;
  res.locals.post = req.session.post;
  var error = req.flash('error');
  res.locals.error = error.length ? error : null;

  var success = req.flash('success');
  res.locals.success = success.length ? success : null;
  next();
});*/

app.use('/', routes);
app.use('/users', users);
app.use('/login', login)

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

module.exports = app;
