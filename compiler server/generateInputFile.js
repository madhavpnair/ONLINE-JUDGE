import fs from 'fs/promises'; // Promises version of fs for async operations
import fsSync from 'fs';      
import path from 'path';
import { v4 as uuid } from 'uuid'; //for unique file names
import { fileURLToPath } from 'url'; 

// __dirname workaround in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirInputs = path.join(__dirname, 'inputs'); // Directory to store input files

if (!fsSync.existsSync(dirInputs)) {
    fsSync.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (input) => {
    const jobId = uuid();
    const inputFileName = `${jobId}.txt`;
    const inputFilePath = path.join(dirInputs, inputFileName);
    await fs.writeFile(inputFilePath, input || ""); // no input defaults to empty string
    console.log(`Input file created at: ${inputFilePath}`);
    return inputFilePath;
};

export default generateInputFile;
