"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_testcases_1 = require("./image.testcases");
const node_1 = require("../node");
const fs_1 = require("fs");
const { execute: inChrome } = require('puppet-master');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const outDir = path.join(__dirname, 'image-tests-out');
try {
    fs.mkdirSync(outDir);
}
catch (err) {
    console.info('Image test folder already created.');
}
const dataUrlCache = new Map();
const getFileAsDataUrl = (filename) => {
    if (!dataUrlCache.has(filename)) {
        dataUrlCache.set(filename, `data:image/png;base64,${fs.readFileSync(filename).toString('base64')}`);
    }
    return dataUrlCache.get(filename);
};
const fonts = {
    Verdana: getFileAsDataUrl(path.join(rootDir, 'assets', 'Verdana.ttf')),
    'Notable-Regular': getFileAsDataUrl(path.join(rootDir, 'assets', 'Notable-Regular.ttf')),
    'DomaineDisplay-Regular.otf': getFileAsDataUrl(path.join(rootDir, 'assets', 'DomaineDisplay-Regular.otf')),
    'Berthold Akzidenz Grotesk Bold Condensed': getFileAsDataUrl(path.join(rootDir, 'assets', 'Berthold Akzidenz Grotesk Bold Condensed.otf')),
};
const ffmpegBinary = path.join(__dirname, '..', 'node', '__tests__', 'bin', 'ffmpeg');
const ffmpeg = async (...args) => {
    const ffmpegProc = spawn(ffmpegBinary, args, {
        // stdio: [0, 1, 2],
        stdio: 'ignore',
    });
    return new Promise((resolve, reject) => {
        ffmpegProc.on('error', (error) => {
            console.error(error); // tslint:disable-line
            reject(error);
        });
        ffmpegProc.on('close', (code) => {
            if (code !== 0)
                reject(new Error(`FFMPEG extited with code ${code}`));
            else
                resolve();
        });
    });
};
const renderFfmpeg = async ({ name, assets, filters }) => {
    const inputs = ['-y'];
    for (const asset of assets) {
        inputs.push('-i');
        inputs.push(asset);
    }
    const outFile = path.join(outDir, `${name}-ffmpeg.png`);
    await ffmpeg(...inputs.concat(['-filter_complex', node_1.filterComplex(filters), outFile]));
    return getFileAsDataUrl(outFile);
};
const runTestcase = async (testcase) => {
    const { name, assets, filters } = testcase;
    const ffmpegResultDataUrl = await renderFfmpeg(testcase);
    const assetFiles = [];
    for (const asset of assets) {
        assetFiles.push(getFileAsDataUrl(asset));
    }
    fs_1.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(testcase, null, 4));
    const result = await inChrome({
        // debug: true,
        func: async (module, args) => {
            return await module.runTest(...args); // tslint:disable-line
        },
        args: [assetFiles, filters, ffmpegResultDataUrl, fonts],
        module: path.join(__dirname, 'image.module.ts'),
    });
    testcase.result = result;
    const dataUrl = result.canvasResult.dataUrl;
    const outFile = path.join(outDir, `${name}-canvas.png`);
    const data = Buffer.from(dataUrl.substr(dataUrl.indexOf(',') + 1), 'base64');
    fs.writeFileSync(outFile, data);
    if (!result.diffResult) {
        throw new Error(`Image dimensions don't match <canvas> = (${result.canvasResult.width}, ${result.canvasResult.height}); ffmpeg = (${result.ffmpegResult.width}, ${result.ffmpegResult.height})`);
    }
    const dataUrlDiff = result.diffResult.dataUrl;
    const dataUrlAll = result.diffResult.dataUrlCombined;
    const outFileDiff = path.join(outDir, `${name}-diff.png`);
    const outFileAll = path.join(outDir, `${name}-all.png`);
    const dataDiff = Buffer.from(dataUrlDiff.substr(dataUrlDiff.indexOf(',') + 1), 'base64');
    const dataAll = Buffer.from(dataUrlAll.substr(dataUrlAll.indexOf(',') + 1), 'base64');
    fs.writeFileSync(outFileDiff, dataDiff);
    fs.writeFileSync(outFileAll, dataAll);
    const threshold = 3;
    if (result.diffResult.diff > threshold) {
        throw new Error(`Discrepancy ${result.diffResult.percent} is more than ${threshold}% threshold.`);
    }
    return result.diffResult.percent;
};
const testNames = new Set();
const main = async () => {
    let passed = true;
    for (const testcase of image_testcases_1.testcases) {
        if (testNames.has(testcase.name)) {
            throw new Error(`Test case with name [${testcase.name}] already exists.`);
        }
        testNames.add(testcase.name);
        try {
            const percent = await runTestcase(testcase);
            console.log(`✅  Passed [${testcase.name}], difference ${percent}`); // tslint:disable-line
        }
        catch (error) {
            passed = false;
            console.log(`❌  Failed [${testcase.name}]: ${error.message}`); // tslint:disable-line
            console.error(error); // tslint:disable-line
        }
    }
    // Create index.html for CircleCI.
    fs_1.writeFileSync(path.join(outDir, 'index.html'), `
  <html>
  <head>
    <title>Functional Tests</title>
  </head>
  <body>
    <ul>
      ${image_testcases_1.testcases
        .map((testcase) => `
          <li>
            <a href="${testcase.name}-all.png" style="font-family:monospace">${testcase.name}</a>
            ${testcase.result
        ? `, &Delta; = <b style="color:${testcase.result.diffResult.diff > 3 ? 'red' : 'green'}">${testcase.result.diffResult.percent}</b>`
        : ''}
            &mdash; <a href="${testcase.name}.json">spec</a>
          </li>
        `)
        .join('')}
    </ul>
  </body>
  </html>
  `);
    if (!passed) {
        process.exit(1);
    }
};
main().then(() => { }, console.error); // tslint:disable-line
//# sourceMappingURL=image.tests.js.map