//imports for express framework and QOL Libraries
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//imported from the ./routes folder for express routers to handle different pages
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
const trackRouter = require('./routes/track');
const mediaRouter = require('./routes/mediatype');
const playlistRouter = require('./routes/playlist');
const genreRouter = require('./routes/genre');
const invoiceRouter = require('./routes/invoices');
const customerRouter = require('./routes/customer');
const employeeRouter = require('./routes/employee');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//adjusting parameters for the server
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing paths using the corresponding routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artist', artistRouter);
app.use('/album', albumRouter);
app.use('/track', trackRouter);
app.use('/media-type', mediaRouter);
app.use('/playlist', playlistRouter);
app.use('/genre', genreRouter);
app.use('/invoices', invoiceRouter);
app.use('/customers', customerRouter);
app.use('/employees', employeeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("Server is running...");


module.exports = app;
