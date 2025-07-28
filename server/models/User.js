const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
    required: true,
  },
  lastname: {
    type: String,
    default: null,
    required: true,
  },
  email: {
    type: String,
    default: null,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    default: null,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: null,
    required: true,
  },

  // New fields
  problemsSolved: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  ranking: {
    type: Number,
    default: 0,
  },
  submissions: [
    {
      problemId: String,
      status: String, // e.g. "Accepted", "Wrong Answer"
      language: String,
      submittedAt: { type: Date, default: Date.now },
    }
  ],
  bio: {
    type: String,
    default: '',
  },
  institution: {
    type: String,
    default: '',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("User", userSchema);
