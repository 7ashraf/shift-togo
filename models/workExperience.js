const mongoose = require('mongoose');
const { Schema } = mongoose;

const workExperienceSchema = new Schema({
  companyName: String,
  position: String,
  startDate: Date,
  endDate: Date,
  summary: String,
  currentlyActive: Boolean
});

const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);
