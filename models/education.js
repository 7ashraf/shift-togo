const mongoose = require('mongoose');
const { Schema } = mongoose;

const educationSchema = new Schema({
  schoolName: String,
  degree: String,
  major: String,
  startDate: Date,
  endDate: Date,
  currentlyActive: Boolean
  // Other education fields...
});

const Education = mongoose.model('Education', educationSchema);
