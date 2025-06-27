"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
const createCanvasAndContext_1 = __importDefault(require("../util/createCanvasAndContext"));
const overlay = ([background, foreground], args) => {
    const x = args.x;
    const y = args.y;
    const { width, height } = background;
    const [canvas, context, dispose] = createCanvasAndContext_1.default();
    canvas.width = width;
    canvas.height = height;
    const render = (time, initialFrame) => {
        const backgroundUpdated = background.renderFrame(time);
        const foregroundUpdated = foreground.renderFrame(time);
        if (!(backgroundUpdated || foregroundUpdated || initialFrame)) {
            return false;
        }
        context.clearRect(0, 0, width, height);
        context.drawImage(background.canvas, 0, 0);
        context.drawImage(foreground.canvas, x, y);
        return true;
    };
    return [new Asset_1.default(background.duration, width, height, canvas, context, render, dispose)];
};
exports.default = overlay;
//# sourceMappingURL=overlay.js.map