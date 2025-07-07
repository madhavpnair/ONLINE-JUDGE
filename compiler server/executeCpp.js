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
        exec(
            `g++ ${filePath} -o ${outPath} && ${outPath} < ${inputPath}`,  //use c++ compilation system
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                } else if (stderr) {
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            }
        );
    });
};


export default executeCpp;
