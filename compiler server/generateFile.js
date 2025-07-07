import fs from 'fs/promises'; // Promises version of fs for async operations
import fsSync from 'fs';       
import path from 'path';
import { v4 as uuid } from 'uuid';// UUID for unique file names
import { fileURLToPath } from 'url';

// __dirname workaround in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory to store generated files
const dirCodes = path.join(__dirname, 'codes');

if (!fsSync.existsSync(dirCodes)) {
    fsSync.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language, code) => {
    const jobId = uuid();
    const fileName = `${jobId}.${language}`;
    const filePath = path.join(dirCodes, fileName);
    console.log(`File path: ${filePath}`);
    await fs.writeFile(filePath, code);
    console.log(`File created and written at: ${filePath}`);
    return filePath;
};

export default generateFile;
