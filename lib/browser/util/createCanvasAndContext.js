"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const canvasPool_1 = __importDefault(require("../canvasPool"));
const createCanvasAndContext = () => {
    const canvas = canvasPool_1.default.get();
    const context = canvas.getContext('2d');
    if (!context) {
        throw new Error('Could not get canvas context.');
    }
    return [canvas, context, () => canvasPool_1.default.put(canvas)];
};
exports.default = createCanvasAndContext;
//# sourceMappingURL=createCanvasAndContext.js.map