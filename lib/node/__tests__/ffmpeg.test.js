"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf_1 = require("rimraf");
const ffmpeg_1 = __importDefault(require("./ffmpeg"));
const filterComplex_1 = __importDefault(require("../filterComplex"));
jest.setTimeout(1200000);
test('ffmpeg', async () => {
    rimraf_1.sync(__dirname + '/../../../assets/generated/output.mp4');
    await ffmpeg_1.default('-i', __dirname + '/../../../assets/Video Of People Walking.mp4', '-movflags', 'faststart', '-filter:v', 'setpts=0.1*PTS', __dirname + '/../../../assets/generated/output.mp4');
});
// see https://www.youtube.com/watch?v=hElDsyuAQDA for
// chaining video filters
test('ffmpeg overlay', async () => {
    rimraf_1.sync(__dirname + '/../../../assets/generated/output-overlay.mp4');
    await ffmpeg_1.default('-i', __dirname + '/../../../assets/Video Of People Walking.mp4', '-ignore_loop', '0', '-i', __dirname + '/../../../assets/loop.gif', '-movflags', 'faststart', '-filter_complex', filterComplex_1.default([
        {
            inputs: ['0', '1'],
            name: 'overlay',
            args: {
                x: 500,
                y: 100,
            },
        },
        {
            name: 'trim',
            args: {
                start: 0,
                end: 5,
            },
        },
    ]), __dirname + '/../../../assets/generated/output-overlay.mp4');
});
test('image overlay', async () => {
    rimraf_1.sync(__dirname + '/../../../assets/generated/image-overlay.jpg');
    await ffmpeg_1.default('-i', __dirname + '/../../../assets/image.jpg', '-i', __dirname + '/../../../assets/threads-logo-gold.png', '-filter_complex', filterComplex_1.default([
        {
            inputs: ['0', '1'],
            name: 'overlay',
            args: {
                x: 500,
                y: 100,
            },
        },
    ]), __dirname + '/../../../assets/generated/image-overlay.jpg');
});
//# sourceMappingURL=ffmpeg.test.js.map