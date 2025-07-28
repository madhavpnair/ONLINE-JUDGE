const mongoose = require('mongoose');

// Schema for hidden test cases (used only in backend)
const testCaseSchema = new mongoose.Schema({
  input: { type: String, minlength: 0},
  expectedOutput: { type: String, required: true }
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  inputFormat: { type: String },
  outputFormat: { type: String },
  constraints: { type: String },

  // Sample Input/Output shown publicly (not stored in testCases)
  sampleInput: { type: String },
  sampleOutput: { type: String },

  difficulty: {
    type: String,
    enum: ['L1', 'L2', 'L3', 'L4', 'L5'],
    default: 'L3'
  },
  tags: [String],

  // Only hidden test cases for judging go here
  testCases: [testCaseSchema],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', problemSchema);
