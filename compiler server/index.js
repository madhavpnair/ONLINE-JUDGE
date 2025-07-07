//ESM - import export module syntax and no require commands
//type: module in package.json
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateFile from './generateFile.js';
import executeCpp from './executeCpp.js';
import generateInputFile from './generateInputFile.js';
import { aiCodeReview, aiHintLevel1, aiHintLevel2 } from './aifeatures.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//check if the server is online
app.get('/', (req, res) => {
  res.json({ online: 'compiler' });
});

app.post('/run', async (req, res) => {
  const { language, code, input } = req.body;
  if (code === undefined) {
    return res.status(400).json({ success: false, error: 'Empty code body' });
  }

  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    const output = await executeCpp(filePath, inputPath);
    res.json({ filePath, inputPath, output, success: true });
    console.log(`File generated at: ${filePath}`);
    console.log(`Input file generated at: ${inputPath}`);
    console.log(`Output: ${output}`);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// AI Code Review endpoint
app.get('/ai/code-review', (req, res) => {
  res.json({ message: 'AI Code Review endpoint is ready. Use POST /ai/code-review with code and age confirmation.' });
});

app.post('/ai/code-review', async (req, res) => {
  const { code } = req.body;
  try {
    const review = await aiCodeReview(code);
    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//AI Hint endpoints

//level 1 hint
app.get('/ai/hint/level1', (req, res) => {
  res.json({ message: 'AI Hint Level 1 endpoint is ready. Use POST /ai/hint/level1 with problem description.' });
});

app.post('/ai/hint/level1', async (req, res) => {
  const { problem } = req.body;
  try {
    const hint = await aiHintLevel1(problem);
    res.json({ success: true, hint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//level 2 hint
app.post('/ai/hint/level2', async (req, res) => {
  const { problem } = req.body; // Ensure problem is provided   
  try {
    const hint = await aiHintLevel2(problem);
    res.json({ success: true, hint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }   
});


// Error explanation endpoint
app.post('/ai/error-explanation', async (req, res) => { 
  const { errorMessage, code } = req.body; // Ensure errorMessage and code are provided
  try {
    const explanation = await aiErrorExplanation(errorMessage, code);
    res.json({ success: true, explanation });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(8000, () => {
  console.log('server is listening at port 8000!');
});
