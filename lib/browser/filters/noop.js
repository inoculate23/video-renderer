"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
/**
 * A no-op filter for anything that doesn't affect canvas implementation
 */
const noop = ([asset]) => {
    return [new Asset_1.default(asset.duration, asset.width, asset.height, asset.canvas, asset.context, asset.renderFrame)];
};
exports.default = noop;
//# sourceMappingURL=noop.js.map