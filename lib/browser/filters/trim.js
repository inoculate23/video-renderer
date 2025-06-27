"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
const trim = (inputs, args) => {
    const start = +args.start;
    const end = +args.end;
    const i = inputs[0];
    if (start === 0) {
        return [new Asset_1.default(end, i.width, i.height, i.canvas, i.context, i.renderFrame)];
    }
    return [new Asset_1.default(end - start, i.width, i.height, i.canvas, i.context, (time) => i.renderFrame(time + start))];
};
exports.default = trim;
//# sourceMappingURL=trim.js.map