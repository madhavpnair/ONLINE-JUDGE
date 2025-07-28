import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const executePython = async (filePath, inputPath) => {
    const command = inputPath
        ? `python3 "${filePath}" < "${inputPath}"`
        : `python3 "${filePath}"`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ success: false, error: error.message, stderr });
            } else if (stderr) {
                reject({ success: false, stderr });
            } else {
                resolve({ success: true, output: stdout });
            }
        });
    });
};

export default executePython;
