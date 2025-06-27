"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("../browser");
Promise.all([browser_1.Asset.fromImage(require('../../assets/grid.jpg'))])
    .then((inputs) => {
    const complexFilters = [
        {
            inputs: ['0'],
            name: 'drawtext',
            args: {
                fontfile: './assets/Verdana.ttf',
                text: 'SOME TEXT',
                x: 40,
                y: 40,
                fontsize: '100',
                fontcolor: 'yellow',
                box: 1,
                boxcolor: 'black',
                boxborderw: 0,
            },
        },
    ];
    const canvas = document.createElement('canvas');
    canvas.style.width = `${inputs[0].width}px`;
    canvas.style.height = `${inputs[0].height}px`;
    document.body.appendChild(canvas);
    browser_1.render(canvas, browser_1.filterComplex(inputs, complexFilters));
})
    .catch((err) => console.error(err));
//# sourceMappingURL=text_cropped.js.map