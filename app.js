var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path)
    next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect(process.env.MONGO).then(()=>{
  app.listen(4000, ()=>{
      console.log('listening on port 4000')
      console.log('connected to db')
  })
}).catch((error)=>{
  console.log(error)
})
module.exports = app;
