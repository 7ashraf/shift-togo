const mongoose = require("mongoose")

const Schema = mongoose.Schema

const jobSeekerSchema = new Schema({
    user:[{
        type: Schema.Types.ObjectId, ref: 'User'
        }
      ],
    openApplications:[{
        type: Schema.Types.ObjectId, ref: 'JobListing'
        }
      ],
    resume:{
        type: Schema.Types.ObjectId, ref: 'Resume'
    }
      

})
module.exports = mongoose.model('JobSeeker', jobSeekerSchema)
