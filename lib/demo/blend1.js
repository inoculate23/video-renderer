"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("../browser");
const canvas = document.createElement('canvas');
canvas.style.width = '640px';
canvas.style.height = '1136px';
canvas.style.margin = 'auto';
canvas.style.display = 'block';
document.body.appendChild(canvas);
Promise.all([
    browser_1.Asset.fromImage(require('../../assets/image.jpg')),
    browser_1.Asset.fromImage(require('../../assets/servers.png')),
    browser_1.Asset.fromImage(require('../../assets/image.jpg')),
])
    .then((inputs) => {
    browser_1.render(canvas, browser_1.filterComplex(inputs, [
        {
            inputs: ['0'],
            name: 'crop',
            args: {
                w: 200,
                h: 200,
                x: 100,
                y: 100,
            },
            outputs: ['c1'],
        },
        {
            inputs: ['1'],
            name: 'crop',
            args: {
                w: 200,
                h: 200,
                x: 0,
                y: 0,
            },
            outputs: ['c2'],
        },
        {
            inputs: ['c1', 'c2'],
            name: 'blend',
            args: {
                c0_mode: 'multiply',
            },
            outputs: ['m'],
        },
        {
            inputs: ['2', 'm'],
            name: 'overlay',
            args: { x: 100, y: 100 },
        },
    ]));
})
    .catch((err) => console.error(err));
//# sourceMappingURL=blend1.js.map