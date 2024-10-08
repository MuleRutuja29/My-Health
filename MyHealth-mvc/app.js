var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const doctorsRouter = require('./routes/doctors');
const patientsRouter = require('./routes/patients');
const reportRouter = require('./routes/reports');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctors', doctorsRouter);
app.use('/patients',patientsRouter);
app.use('/reports',reportRouter)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



//MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/myHealth')
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });


module.exports = app;
