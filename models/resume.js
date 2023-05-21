const mongoose = require("mongoose")

const Schema = mongoose.Schema

const resumeSchema = new Schema({
    jobSeeker:{
        type: Schema.Types.ObjectId, ref: 'JobSeeker'
    },
    education: [{ type: Schema.Types.ObjectId, ref: 'Education' }],
    workExperience: [{ type: Schema.Types.ObjectId, ref: 'WorkExperience' }],

})

module.exports = mongoose.model('Resume', resumeSchema)

