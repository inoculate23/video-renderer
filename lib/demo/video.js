"use strict";
// based on https://jakearchibald.com/scratch/alphavid/
// and https://stackoverflow.com/questions/4073303/can-i-have-a-video-with-transparent-background-using-html5-video-tag
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("../browser");
const canvas = document.createElement('canvas');
canvas.style.width = '300px';
canvas.style.height = '300px';
canvas.style.margin = 'auto';
canvas.style.display = 'block';
document.body.appendChild(canvas);
Promise.all([
    browser_1.Asset.fromVideo('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'),
    browser_1.Asset.fromVideoWithAlpha(require('../../assets/generated/loop.mp4')),
    browser_1.Asset.fromImage('https://user-images.githubusercontent.com/3481367/45488425-4ad14080-b759-11e8-9629-2fb02283f02e.png'),
    browser_1.Asset.fromImage('https://user-images.githubusercontent.com/3481367/45488425-4ad14080-b759-11e8-9629-2fb02283f02e.png'),
])
    .then((inputs) => {
    const f = (x, y) => browser_1.filterComplex(inputs, [
        /*
      {
        inputs: ['2'],
        name: 'scale',
        args: {w: 150, h: 150},
        outputs: ['asset2'],
      },
      */
        {
            inputs: ['2'],
            name: 'rotate',
            args: { angle: Math.PI / 6 },
            outputs: ['asset2rotated'],
        },
        {
            inputs: ['1'],
            name: 'scale',
            args: { w: 111, h: 111 },
            outputs: ['asset1'],
        },
        {
            inputs: ['0', 'asset1'],
            name: 'overlay',
            args: { x, y },
            outputs: ['merge1'],
        },
        {
            inputs: ['merge1', 'asset2rotated'],
            name: 'overlay',
            args: { x: 100, y: 10 },
            outputs: ['merge2'],
        },
        {
            inputs: ['merge2', '3'],
            name: 'overlay',
            args: { x: 50, y: 250 },
            outputs: ['merge3'],
        },
        {
            inputs: ['merge3'],
            name: 'trim',
            args: {
                start: 0,
                end: 5,
            },
        },
        {
            name: 'drawtext',
            args: {
                text: 'SOME TEXT',
                x: 150,
                y: 350,
                fontsize: 72,
                fontcolor: 'white',
                box: 1,
                boxcolor: 'black',
                boxborderw: 10,
            },
        },
    ]);
    browser_1.render(canvas, f(100, 100));
})
    .catch((err) => console.error(err));
//# sourceMappingURL=video.js.map