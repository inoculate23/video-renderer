"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
const createCanvasAndContext_1 = __importDefault(require("../util/createCanvasAndContext"));
const rotate = ([asset], { angle, out_w, out_h, fillcolor = '#000000' }) => {
    const [canvas, context, dispose] = createCanvasAndContext_1.default();
    const width = out_w ? out_w : asset.width;
    const height = out_h ? out_h : asset.height;
    const angleInRadians = angle;
    canvas.width = width;
    canvas.height = height;
    const render = (time, initialFrame) => {
        if (!(asset.renderFrame(time) || initialFrame)) {
            return false;
        }
        context.clearRect(0, 0, width, height);
        context.save();
        context.fillStyle = String(fillcolor);
        context.fillRect(0, 0, width, height);
        context.translate(width / 2, height / 2);
        context.rotate(angleInRadians);
        context.drawImage(asset.canvas, -asset.canvas.width / 2, -asset.canvas.height / 2);
        context.restore();
        return true;
    };
    return [new Asset_1.default(asset.duration, width, height, canvas, context, render, dispose)];
};
exports.default = rotate;
//# sourceMappingURL=rotate.js.map