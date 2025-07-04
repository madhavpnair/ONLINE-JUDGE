const express = require('express');
//const cors = require('cors');
//const dotenv = require('dotenv');
const generateFile = require('./generateFile');
const executeCpp = require('./executeCpp');
const generateInputFile = require('./generateInputFile'); // Assuming you have a function to handle input files

const app= express();
//dotenv.config();

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({online:'compiler'}); 
});


app.post('/run', async (req, res) => {
  
  
  const {language, code, input } = req.body; //destructuring assignment
  if(code===undefined){
    return res.status(400).json({ success: false, error: 'Empty code body'});
  }
  try{
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    const output = await executeCpp(filePath, inputPath);
    res.json({filePath, inputPath, output, success: true});
    console.log(`File generated at: ${filePath}`);
    console.log(`Input file generated at: ${inputPath}`);
    console.log(`Output: ${output}`);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    console.log(`Error: ${error}`);
  }
 
  
});

//complete all the routes
//add process.env.PORT later when deploying
app.listen(8000, () => {
  console.log('server listening at port 8000!');
});
