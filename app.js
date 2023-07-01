var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const helloWorld = require('./routes/helloWorld')
const authRouter = require('./routes/auth')
const employerRouter = require('./routes/employer');
const jobListingRouter = require('./routes/jobListing');
const jobSeekerRouter = require('./routes/jobSeekerRouter');



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
app.use('/api/auth/', authRouter)
app.use('/api/employer/', employerRouter)
app.use('/api/job-listing/', jobListingRouter)
app.use('/api/job-seeker', jobSeekerRouter)

mongoose.connect(process.env.MONGO).then(()=>{
  app.listen(process.env.PORT, ()=>{
      console.log('listening on port 4000')
      console.log('connected to db')
  })
}).catch((error)=>{
  console.log(error)
})
module.exports = app;
//TODO: initialize api, add user auth using passport and jwt