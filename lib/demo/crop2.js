"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("../browser");
const canvas = document.createElement('canvas');
canvas.style.width = '100px';
canvas.style.height = '100px';
canvas.style.margin = 'auto';
canvas.style.display = 'block';
document.body.appendChild(canvas);
Promise.all([browser_1.Asset.fromImage(require('../../assets/servers.png'))])
    .then((inputs) => {
    browser_1.render(canvas, browser_1.filterComplex(inputs, [
        {
            name: 'crop',
            args: {
                w: 200,
                h: 200,
                x: 0,
                y: 0,
            },
        },
    ]));
})
    .catch((err) => console.error(err));
//# sourceMappingURL=crop2.js.map