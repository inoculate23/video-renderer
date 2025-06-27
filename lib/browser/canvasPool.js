"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isTainted_1 = __importDefault(require("./util/isTainted"));
let canvases = [];
const canvasPool = {
    get() {
        if (canvases.length === 0) {
            canvases.push(document.createElement('canvas'));
        }
        return canvases.pop();
    },
    put(canvas) {
        const context = canvas.getContext('2d');
        if (context !== null && !isTainted_1.default(context)) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvases.push(canvas);
        }
    },
    clear() {
        canvases = [];
    },
};
exports.default = canvasPool;
//# sourceMappingURL=canvasPool.js.map