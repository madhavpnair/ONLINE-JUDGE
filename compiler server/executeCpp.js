import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// this is for ESM compatibility (not using CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, inputPath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    console.log(`Output file path: ${outPath}`);
    return new Promise((resolve, reject) => {

        const command = inputPath
            ? `g++ "${filePath}" -o "${outPath}" && "${outPath}" < "${inputPath}"`
            : `g++ "${filePath}" -o "${outPath}" && "${outPath}"`;
            
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Compilation or Execution Error:", error.message);
                reject({ success: false, error: error.message, stderr });
            } else if (stderr) {
                console.error("Runtime STDERR:", stderr);
                reject({ success: false, stderr });
            } else {
                resolve({ success: true, output: stdout });
            }
        });


    });
};


export default executeCpp;
