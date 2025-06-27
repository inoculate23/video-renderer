"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf_1 = require("rimraf");
const ffmpeg_1 = __importDefault(require("./ffmpeg"));
const extractAlpha_1 = __importDefault(require("../extractAlpha"));
const filterComplex_1 = __importDefault(require("../filterComplex"));
jest.setTimeout(1200000);
test('gif', async () => {
    rimraf_1.sync(__dirname + '/../../../assets/generated/loop.mp4');
    await ffmpeg_1.default('-i', __dirname + '/../../../assets/loop.gif', '-movflags', 'faststart', 
    // pix_fmt is needed for converting gifs
    '-pix_fmt', 'yuv420p', '-filter_complex', filterComplex_1.default(extractAlpha_1.default('0')), __dirname + '/../../../assets/generated/loop.mp4');
});
//# sourceMappingURL=extractAlpha.test.js.map