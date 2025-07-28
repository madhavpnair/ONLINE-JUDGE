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

const executeJava = async (filePath, inputPath) => {
    const fileName = path.basename(filePath);       // HelloWorld.java
    const className = fileName.split('.')[0];       // HelloWorld
    const dirPath = path.dirname(filePath);         // path to the Java file

    return new Promise((resolve, reject) => {
        const compileCommand = `javac "${filePath}" -d "${outputPath}"`;
        const runCommand = inputPath
            ? `java -cp "${outputPath}" ${className} < "${inputPath}"`
            : `java -cp "${outputPath}" ${className}`;

        exec(compileCommand, (compileErr, _, compileStderr) => {
            if (compileErr || compileStderr) {
                reject({ success: false, error: compileErr?.message, stderr: compileStderr });
                return;
            }

            exec(runCommand, (runErr, stdout, runStderr) => {
                if (runErr) {
                    reject({ success: false, error: runErr.message, stderr: runStderr });
                } else if (runStderr) {
                    reject({ success: false, stderr: runStderr });
                } else {
                    resolve({ success: true, output: stdout });
                }
            });
        });
    });
};

export default executeJava;
