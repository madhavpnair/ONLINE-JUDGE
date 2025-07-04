const fs=require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');//example: '/path/to/your/project/outputs'

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, inputPath) => {
    const jobId = path.basename(filePath).split(".")[0]; // Extract job ID from file name
    const outPath= path.join(outputPath, `${jobId}.out`); // Output file path

    return new Promise((resolve, reject) => {
       exec(
        `g++ ${filePath} -o ${outPath} && ${outPath} < ${inputPath}`, 
        (error, stdout, stderr) => {
            if (error) {
                reject({error,stderr});
            }
            if (stderr) {
                reject(stderr);
            }
            //code executed successfully, return the output
            resolve(stdout);
        });
    });
};

module.exports = executeCpp;
