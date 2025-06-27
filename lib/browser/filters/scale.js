"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
const createCanvasAndContext_1 = __importDefault(require("../util/createCanvasAndContext"));
const scale = ([asset], { w, h }) => {
    const [canvas, context, dispose] = createCanvasAndContext_1.default();
    const width = (canvas.width = w);
    const height = (canvas.height = h);
    const render = (time, initialFrame) => {
        if (!(asset.renderFrame(time) || initialFrame)) {
            return false;
        }
        context.clearRect(0, 0, width, height);
        context.drawImage(asset.canvas, 0, 0, asset.width, asset.height, 0, 0, canvas.width, canvas.height);
        return true;
    };
    return [new Asset_1.default(asset.duration, canvas.width, canvas.height, canvas, context, render, dispose)];
};
exports.default = scale;
//# sourceMappingURL=scale.js.map