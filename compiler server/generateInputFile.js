const fs=require('fs').promises; // Using promises version of fs for async operations
const fsSync = require('fs'); // Using synchronous version of fs for directory checks
const path = require('path');   
const {v4 : uuid} = require('uuid'); // UUID library to generate unique IDs

const dirInputs = path.join(__dirname, 'inputs'); // Directory to store input files

if(!fsSync.existsSync(dirInputs)) {
    fsSync.mkdirSync(dirInputs, { recursive: true }); 
}


const generateInputFile = async (input) => {
    const jobId = uuid(); // Generate a unique ID for the input file
    const input_fileName = `${jobId}.txt`; // input file is a text file
    const input_filePath = path.join(dirInputs, input_fileName); 
    await fs.writeFile(input_filePath, input); // Write the input to the file, defaulting to an empty string if no input is provided
    console.log(`Input file created at: ${input_filePath}`);
    
    return input_filePath; // Return the path of the generated input file
};


module.exports = generateInputFile; 