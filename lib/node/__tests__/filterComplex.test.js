"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filterComplex_1 = __importDefault(require("../filterComplex"));
const ComplexFilter_1 = require("../../shared/ComplexFilter");
const fc = [
    {
        inputs: [{ name: '0', kind: ComplexFilter_1.FilterInputKind.Both }, { name: '1', kind: ComplexFilter_1.FilterInputKind.Both }],
        outputs: ['overlaid'],
        name: 'overlay',
        args: {
            x: 500,
            y: 100,
        },
    },
    {
        inputs: [{ name: 'overlaid', kind: ComplexFilter_1.FilterInputKind.Both }],
        outputs: ['trimmed'],
        name: 'trim',
        args: {
            start: 0,
            end: 5,
        },
    },
    {
        inputs: [{ name: 'trimmed', kind: ComplexFilter_1.FilterInputKind.Both }],
        name: 'drawtext',
        args: {
            fontfile: `./assets/Verdana.ttf`,
            text: "Jason's \"friend\": it's, not you/me; it's you",
            x: 0,
            y: 10,
            fontsize: '70',
            fontcolor: 'black',
        },
    },
];
test('filterComplex', () => {
    expect(filterComplex_1.default(fc)).toMatchInlineSnapshot(`"[0][1]overlay=x=500:y=100[overlaid],[overlaid]trim=start=0:end=5[trimmed],[trimmed]drawtext=fontfile=./assets/Verdana.ttf:text=Jason\\\\\\\\\\\\'s \\"friend\\"\\\\\\\\: it\\\\\\\\\\\\'s\\\\, not you/me\\\\; it\\\\\\\\\\\\'s you:x=0:y=10:fontsize=70:fontcolor=black"`);
});
//# sourceMappingURL=filterComplex.test.js.map