const mongoose = require("mongoose")

const Schema = mongoose.Schema
//TODO company info
const employerSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, ref: 'User',
        required : true,
        unique: true
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
