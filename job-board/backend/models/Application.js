const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  resumePath: String,
  status: { type: String, enum: ['applied','reviewing','rejected','accepted'], default: 'applied' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
