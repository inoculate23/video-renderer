"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("../browser");
const canvas = document.createElement('canvas');
canvas.style.width = '100px';
canvas.style.height = '100px';
canvas.style.margin = 'auto';
canvas.style.display = 'block';
document.body.appendChild(canvas);
Promise.all([browser_1.Asset.fromImage(require('../../assets/image.jpg'))])
    .then((inputs) => {
    browser_1.render(canvas, browser_1.filterComplex(inputs, [
        {
            name: 'crop',
            args: {
                w: 100,
                h: 100,
                x: 10,
                y: 10,
            },
        },
    ]));
})
    .catch((err) => console.error(err));
//# sourceMappingURL=crop1.js.map