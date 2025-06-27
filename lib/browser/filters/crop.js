"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
const createCanvasAndContext_1 = __importDefault(require("../util/createCanvasAndContext"));
const crop = ([asset], args) => {
    const [canvas, context, dispose] = createCanvasAndContext_1.default();
    const width = (args.w || args.out_w);
    const height = (args.h || args.out_h);
    const x = args.x;
    const y = args.y;
    canvas.width = width;
    canvas.height = height;
    const render = (time, initialFrame) => {
        if (!(asset.renderFrame(time) || initialFrame)) {
            return false;
        }
        context.clearRect(0, 0, width, height);
        context.drawImage(asset.canvas, x, y, width, height, 0, 0, width, height);
        return true;
    };
    return [new Asset_1.default(asset.duration, width, height, canvas, context, render, dispose)];
};
exports.default = crop;
//# sourceMappingURL=crop.js.map