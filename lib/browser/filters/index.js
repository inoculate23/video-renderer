"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trim_1 = __importDefault(require("./trim"));
const overlay_1 = __importDefault(require("./overlay"));
const drawtext_1 = __importDefault(require("./drawtext"));
const noop_1 = __importDefault(require("./noop"));
const scale_1 = __importDefault(require("./scale"));
const drawbox_1 = __importDefault(require("./drawbox"));
const rotate_1 = __importDefault(require("./rotate"));
const crop_1 = __importDefault(require("./crop"));
const pad_1 = __importDefault(require("./pad"));
const blend_1 = __importDefault(require("./blend"));
exports.filters = {
    trim: trim_1.default,
    overlay: overlay_1.default,
    drawtext: drawtext_1.default,
    drawbox: drawbox_1.default,
    loop: noop_1.default,
    format: noop_1.default,
    scale: scale_1.default,
    rotate: rotate_1.default,
    crop: crop_1.default,
    pad: pad_1.default,
    blend: blend_1.default,
};
//# sourceMappingURL=index.js.map