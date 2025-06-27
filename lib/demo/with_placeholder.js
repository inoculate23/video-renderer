"use strict";
// based on https://jakearchibald.com/scratch/alphavid/
// and https://stackoverflow.com/questions/4073303/can-i-have-a-video-with-transparent-background-using-html5-video-tag
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("../browser");
const createCanvasAndContext_1 = __importDefault(require("../browser/util/createCanvasAndContext"));
const canvas = document.createElement('canvas');
canvas.style.width = '300px';
canvas.style.height = '300px';
canvas.style.margin = 'auto';
canvas.style.display = 'block';
document.body.appendChild(canvas);
const [placeCanvas, placeContext, placeDispose] = createCanvasAndContext_1.default();
placeCanvas.width = 256;
placeCanvas.height = 256;
// could it be the canvas sizes??
const placeholder = new browser_1.Asset(0.9, 256, 256, placeCanvas, placeContext, (_timestamp, isInitialRender) => {
    const oldFillStyle = placeContext.fillStyle;
    placeContext.fillStyle = 'rgba(0, 0, 0, 0.3)';
    placeContext.clearRect(0, 0, 256, 256);
    placeContext.fillRect(0, 0, 256, 256);
    placeContext.fillStyle = oldFillStyle;
    return isInitialRender;
}, placeDispose);
const [placeImgCanvas, placeImgContext, placeImgDispose] = createCanvasAndContext_1.default();
placeImgCanvas.width = 140;
placeImgCanvas.height = 140;
const placeholderImg = new browser_1.Asset(0, 140, 100, placeImgCanvas, placeImgContext, (_timestamp, isInitialRender) => {
    const oldFillStyle = placeImgContext.fillStyle;
    placeImgContext.fillStyle = 'rgba(0, 0, 0, 0.3)';
    placeImgContext.clearRect(0, 0, 140, 100);
    placeImgContext.fillRect(0, 0, 140, 100);
    placeImgContext.fillStyle = oldFillStyle;
    return isInitialRender;
}, placeImgDispose);
const slowLoadingVideoWithAlpha = new Promise(async (resolve) => {
    const asset = await browser_1.Asset.fromVideoWithAlpha('http://localhost:3001/generated/loop.mp4');
    setTimeout(() => resolve(asset), 3000);
});
const slowLoadingImage = new Promise(async (resolve) => {
    const asset = await browser_1.Asset.fromImage('https://via.placeholder.com/140x100', { crossOrigin: browser_1.CorsMode.Disabled });
    setTimeout(() => resolve(asset), 2000);
});
Promise.all([
    browser_1.Asset.fromVideo('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', { crossOrigin: browser_1.CorsMode.Disabled }),
    browser_1.Asset.withPlaceholder(slowLoadingVideoWithAlpha, placeholder),
    browser_1.Asset.fromImage('https://user-images.githubusercontent.com/3481367/45488425-4ad14080-b759-11e8-9629-2fb02283f02e.png', { crossOrigin: browser_1.CorsMode.Disabled }),
    browser_1.Asset.withPlaceholder(slowLoadingImage, placeholderImg),
])
    .then((inputs) => {
    const f = (x, y) => browser_1.filterComplex(inputs, [
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
    browser_1.render(canvas, f(80, 100));
})
    .catch((err) => console.error(err));
//# sourceMappingURL=with_placeholder.js.map