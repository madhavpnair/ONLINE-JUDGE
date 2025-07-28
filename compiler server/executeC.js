import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeC = (filePath, inputPath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        const compileCmd = `gcc "${filePath}" -o "${outPath}"`;
        const runCmd = inputPath
            ? `"${outPath}" < "${inputPath}"`
            : `"${outPath}"`;

        exec(`${compileCmd} && ${runCmd}`, (error, stdout, stderr) => {
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

export default executeC;
