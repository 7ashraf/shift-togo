const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobApplicationSchema = new Schema({
  jobSeeker: { type: Schema.Types.ObjectId, ref: 'JobSeeker' },
  jobListing: { type: Schema.Types.ObjectId, ref: 'JobListing' },
  status: { type: String, enum: ['applied', 'reviewed', 'accepted', 'rejected', 'interviewed'] },
  note: String,
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
