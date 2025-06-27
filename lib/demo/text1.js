"use strict";
// Run: ts-node src/demo/text1.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderDemo_1 = __importDefault(require("./util/renderDemo"));
renderDemo_1.default(['image.jpg'], [
    {
        inputs: ['0'],
        name: 'drawtext',
        args: {
            fontfile: './assets/Verdana.ttf',
            text: 'SOME TEXT',
            x: 100,
            y: 100,
            fontsize: 72,
            fontcolor: 'white',
            box: 1,
            boxcolor: 'black',
            boxborderw: 10,
        },
    },
]);
//# sourceMappingURL=text1.js.map