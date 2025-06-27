"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("../browser");
const canvas = document.createElement('canvas');
canvas.style.width = '640px';
canvas.style.height = '1136px';
canvas.style.margin = 'auto';
canvas.style.display = 'block';
document.body.appendChild(canvas);
Promise.all([browser_1.Asset.fromImage(require('../../assets/image.jpg')), browser_1.Asset.fromImage(require('../../assets/servers.png'))])
    .then((inputs) => {
    browser_1.render(canvas, browser_1.filterComplex(inputs, [
        {
            inputs: ['1'],
            name: 'rotate',
            args: {
                angle: 1,
                out_w: 600,
                out_h: 600,
                fillcolor: '#0077ff7f',
            },
            outputs: ['rotated'],
        },
        {
            inputs: ['0', 'rotated'],
            name: 'overlay',
            args: { x: 0, y: 0 },
        },
    ]));
})
    .catch((err) => console.error(err));
//# sourceMappingURL=rotate3.js.map