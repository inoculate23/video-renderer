"use strict";
// Run: ts-node src/demo/text4.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderDemo_1 = __importDefault(require("./util/renderDemo"));
renderDemo_1.default(['grid.jpg', 'empty.png'], [
    {
        inputs: ['1'],
        name: 'scale',
        args: {
            w: 1000,
            h: 1000,
        },
        outputs: ['scaled1'],
    },
    {
        inputs: ['scaled1'],
        name: 'drawtext',
        args: {
            fontfile: '../Verdana.ttf',
            text: 'Where is foo?',
            x: '(500 - tw / 2)',
            y: '(500 - th / 2)',
            fontsize: 40,
            fontcolor: 'black',
        },
        outputs: ['txt1'],
    },
    {
        inputs: ['txt1'],
        name: 'rotate',
        args: {
            angle: Math.PI / 2,
            fillcolor: 'transparent',
        },
        outputs: ['rotated1'],
    },
    {
        inputs: ['0', 'rotated1'],
        name: 'overlay',
        args: {
            x: -250,
            y: -250,
        },
        outputs: ['out0'],
    },
]);
//# sourceMappingURL=text4.js.map