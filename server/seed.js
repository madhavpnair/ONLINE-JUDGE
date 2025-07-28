const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Problem = require('./models/Problem');
const DBConnection = require('./database/db');

DBConnection(); 

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
    tags: ["array", "hashmap"],
    testCases: [
      { input: "1 2 3 4 6\n5", expectedOutput: "1 2" },
      { input: "3 3\n6", expectedOutput: "0 1" },
      { input: "0 4 3 0\n0", expectedOutput: "0 3" },
      { input: "5 75 25\n100", expectedOutput: "1 2" }
    ]
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
    tags: ["math"],
    testCases: [
      { input: "121", expectedOutput: "true" },
      { input: "-121", expectedOutput: "false" },
      { input: "10", expectedOutput: "false" },
      { input: "1221", expectedOutput: "true" }
    ]
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
    tags: ["string", "sliding window"],
    testCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1" },
      { input: "pwwkew", expectedOutput: "3" },
      { input: "", expectedOutput: "0" },
      { input: "au", expectedOutput: "2" }
    ]
  }
];

async function seedProblems() {
  try {
    //Clear existing data
    await Problem.deleteMany(); 

    //Insert new problems
    await Problem.insertMany(problems);
    console.log("✅ Problems inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to insert problems:", error);
    process.exit(1);
  }
}

seedProblems();
