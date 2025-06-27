"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
async function ffmpeg(...args) {
    const ffmpegProc = child_process_1.spawn(`${__dirname}/bin/ffmpeg`, args, { stdio: 'ignore' });
    return new Promise((resolve, reject) => {
        ffmpegProc.on('error', reject);
        ffmpegProc.on('close', (code) => {
            if (code !== 0)
                reject(new Error(`FFMPEG extited with code ${code}`));
            else
                resolve();
        });
    });
}
exports.default = ffmpeg;
//# sourceMappingURL=ffmpeg.js.map