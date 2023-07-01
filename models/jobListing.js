const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobListingSchema = new Schema({

  title: String,
  description: String,
  requirements: [{ type: String }],
  status: { type: String, enum: ['active', 'closed'] },
  applications: [{ type: Schema.Types.ObjectId, ref: 'JobApplication' }],
  //poster:{type: Schema.Types.ObjectId, ref: 'Employer'},
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;
