const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  inputFormat: { type: String },
  outputFormat: { type: String },
  constraints: { type: String },
  sampleInput: { type: String },
  sampleOutput: { type: String },
  difficulty: { type: String, enum: ['L1', 'L2', 'L3','L4','L5'], default: 'L3' },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', problemSchema);
