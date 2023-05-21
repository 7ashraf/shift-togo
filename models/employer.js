const mongoose = require("mongoose")

const Schema = mongoose.Schema
//TODO company info
const employerSchema = new Schema({
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
    jobListings:[{
        type: Schema.Types.ObjectId, ref: 'JobListing'
        }
      ],
    resume:{
        type: Schema.Types.ObjectId, ref: 'Resume'
    }
      

})
module.exports = mongoose.model('Employer', employerSchema)
