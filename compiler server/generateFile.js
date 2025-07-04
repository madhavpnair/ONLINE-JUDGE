const fs= require('fs').promises; // Using promises version of fs for async operations
const fsSync = require('fs'); // Using synchronous version of fs for directory checks
const path = require('path');
const {v4 : uuid} = require('uuid');// UUID library to generate unique IDs

// Directory to store generated files
const dirCodes = path.join(__dirname, 'codes');//example: '/path/to/your/project/codes'

if(!fsSync.existsSync(dirCodes)) {
    fsSync.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language,code) => {
    const jobId = uuid();// example: '123e4567-e89b-12d3-a456-426614174000'
    //console.log(`Generating file for job ID: ${jobId} with language: ${language}`);
    const fileName = `${jobId}.${language}`;//example: '123e4567-e89b-12d3-a456-426614174000.cpp'
    //console.log(`File name: ${fileName}`);
    const filePath = path.join(dirCodes, fileName);//example: '/path/to/your/project/codes/123e4567-e89b-12d3-a456-426614174000.cpp'
    console.log(`File path: ${filePath}`);
    await fs.writeFile(filePath,code); // Write the code to the file
    console.log(`File created and written at: ${filePath}`);
    //console.log(filePath);
    return filePath; // Return the path of the generated file

}

module.exports = generateFile;