"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
const createCanvasAndContext_1 = __importDefault(require("../util/createCanvasAndContext"));
const rotate = ([asset], args) => {
    const [canvas, context, dispose] = createCanvasAndContext_1.default();
    const width = (args.width || args.w);
    const height = (args.height || args.h);
    const x = args.x;
    const y = args.y;
    const color = String(args.color) || '#000000';
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = color;
    const render = (time, initialFrame) => {
        if (!(asset.renderFrame(time) || initialFrame)) {
            return false;
        }
        context.clearRect(0, 0, width, height);
        context.fillRect(0, 0, width, height);
        context.clearRect(x, y, asset.width, asset.height);
        context.drawImage(asset.canvas, x, y);
        return true;
    };
    return [new Asset_1.default(asset.duration, width, height, canvas, context, render, dispose)];
};
exports.default = rotate;
//# sourceMappingURL=pad.js.map