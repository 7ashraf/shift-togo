var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const helloWorld = require('./routes/helloWorld')


app.use(cors())
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
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


//routes
app.use('/api/',helloWorld)

mongoose.connect(process.env.MONGO).then(()=>{
  app.listen(process.env.PORT, ()=>{
      console.log('listening on port 4000')
      console.log('connected to db')
  })
}).catch((error)=>{
  console.log(error)
})
module.exports = app;
