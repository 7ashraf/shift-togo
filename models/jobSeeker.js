const mongoose = require("mongoose")

const Schema = mongoose.Schema

const jobSeekerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    openApplications:[{
        type: Schema.Types.ObjectId, ref: 'JobListing'
        }
      ],
    resume:{
        type: Schema.Types.ObjectId, ref: 'Resume'
    }
      

})
module.exports = mongoose.model('JobSeeker', jobSeekerSchema)
