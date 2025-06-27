"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
const createCanvasAndContext_1 = __importDefault(require("../util/createCanvasAndContext"));
const blend = ([asset1, asset2], { c0_mode }) => {
    const [canvas, context, dispose] = createCanvasAndContext_1.default();
    const { width, height } = asset1;
    canvas.width = width;
    canvas.height = height;
    const render = (time, initialRender) => {
        const updated1 = asset1.renderFrame(time);
        const updated2 = asset2.renderFrame(time);
        if (!(updated1 || updated2 || initialRender)) {
            return false;
        }
        context.clearRect(0, 0, width, height);
        context.globalCompositeOperation = 'source-over';
        context.drawImage(asset2.canvas, 0, 0);
        context.globalCompositeOperation = String(c0_mode);
        context.drawImage(asset1.canvas, 0, 0);
        return true;
    };
    return [new Asset_1.default(asset1.duration, width, height, canvas, context, render, dispose)];
};
exports.default = blend;
//# sourceMappingURL=blend.js.map