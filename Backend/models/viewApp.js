const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  applicationId: { type: String, required: true, unique: true },
  fullName: String,
  aadhar: String,
  phone: String,
  course: String,
  branch:String,
  tenthPercentage: String,
  emcetMarks: String,
  interPercentage: String,
  photo: String,
  signature: String,
  submittedAt: { type: Date, default: Date.now },   // ✅ type must be Date
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  remarks: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
