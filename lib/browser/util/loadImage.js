"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoadAssetOptions_1 = require("./LoadAssetOptions");
async function loadImage(src, options) {
    const img = document.createElement('img');
    LoadAssetOptions_1.setCorsMode(img, src, options);
    img.src = src;
    if (img.complete && img.naturalHeight !== 0) {
        return img;
    }
    await new Promise((resolve, reject) => {
        img.addEventListener('error', reject);
        img.addEventListener('load', () => resolve());
    });
    return img;
}
exports.default = loadImage;
//# sourceMappingURL=loadImage.js.map