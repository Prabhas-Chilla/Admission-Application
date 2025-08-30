const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  course: { type: String, required: true },
  branch: { type: String }, // Optional or required based on course
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  aadhar: { type: String, required: true, unique: true },
  emcetMarks: { type: String, required: true },
  tenthPercentage: { type: Number, required: true },
  interPercentage: { type: Number, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String }, // Save file name or URL
  signature: { type: String }, // Save file name or URL
  // submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
