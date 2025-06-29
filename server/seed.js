const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Problem = require('./models/Problem');
const DBConnection = require('./database/db'); // Your DB connection file

DBConnection(); // Connect to MongoDB

const problems = [
  {
    title: "Two Sum",
    description: "Find two indices such that their values sum to a target.",
    inputFormat: "nums = [2, 7, 11, 15], target = 9",
    outputFormat: "[0, 1]",
    constraints: "Each input has exactly one solution",
    sampleInput: "2 7 11 15\n9",
    sampleOutput: "0 1",
    difficulty: "L2",
    tags: ["array", "hashmap"]
  },
  {
    title: "Palindrome Number",
    description: "Check if an integer is a palindrome.",
    inputFormat: "x = 121",
    outputFormat: "true",
    constraints: "Do not convert the integer to a string.",
    sampleInput: "121",
    sampleOutput: "true",
    difficulty: "L2",
    tags: ["math"]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    inputFormat: "s = 'abcabcbb'",
    outputFormat: "3",
    constraints: "0 <= s.length <= 5 * 10^4",
    sampleInput: "abcabcbb",
    sampleOutput: "3",
    difficulty: "L3",
    tags: ["string", "sliding window"]
  }
];

async function seedProblems() {
  try {
    //await Problem.deleteMany(); // Clear old data (optional)
    await Problem.insertMany(problems);
    console.log("✅ Problems inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to insert problems:", error);
    process.exit(1);
  }
}

seedProblems();
