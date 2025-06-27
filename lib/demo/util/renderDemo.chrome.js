"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This code execute in Chrome browser.
const browser_1 = require("../../browser");
exports.main = async (assets, complexFilters) => {
    const inputs = await Promise.all(assets.map(async (img) => browser_1.Asset.fromImage(img)));
    const canvas = document.createElement('canvas');
    canvas.style.width = `${inputs[0].width}px`;
    canvas.style.height = `${inputs[0].height}px`;
    canvas.style.margin = 'auto';
    canvas.style.display = 'block';
    document.body.appendChild(canvas);
    browser_1.render(canvas, browser_1.filterComplex(inputs, complexFilters));
};
//# sourceMappingURL=renderDemo.chrome.js.map