"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
const createCanvasAndContext_1 = __importDefault(require("../util/createCanvasAndContext"));
const expr_eval_1 = require("expr-eval");
const measureText_1 = __importDefault(require("../util/measureText"));
const parser = new expr_eval_1.Parser();
function parse(path) {
    return (path.split('/').pop() || '').split('.').shift();
}
const drawtext = ([background], args) => {
    const [canvas, context, disposeCanvas] = createCanvasAndContext_1.default();
    const { width, height } = background;
    canvas.width = width;
    canvas.height = height;
    // We use font file name as font face.
    const font = parse(String(args.fontfile)) || '';
    const xExpression = parser.parse(String(args.x));
    const yExpression = parser.parse(String(args.y));
    const text = String(args.text) || '';
    const fontsize = +(args.fontsize || 0);
    const fontcolor = String(args.fontcolor) || '';
    const box = String(args.box) === '1';
    const boxborderw = +(args.boxborderw || 0);
    const boxcolor = String(args.boxcolor) || '';
    const fontStyle = `${fontsize}px ${font}`;
    const { tw, th, start } = measureText_1.default({ text, font, fontsize });
    // Evaluate expressions.
    const expressionArgs = {
        tw,
        text_w: tw,
        th,
        text_h: th,
    };
    const x = xExpression.evaluate(expressionArgs);
    const y = yExpression.evaluate(expressionArgs);
    // Draw text on canvas once.
    const [textCanvas, textContext, disposeText] = createCanvasAndContext_1.default();
    textCanvas.width = tw + boxborderw * 2;
    textCanvas.height = th + boxborderw * 2 || 1;
    if (box) {
        textContext.fillStyle = boxcolor;
        textContext.fillRect(0, 0, textCanvas.width, textCanvas.height);
    }
    textContext.textBaseline = 'top';
    textContext.font = fontStyle;
    textContext.fillStyle = fontcolor;
    textContext.fillText(text, boxborderw, boxborderw - start);
    const render = (time, initialFrame) => {
        if (!(background.renderFrame(time) || initialFrame)) {
            return false;
        }
        context.clearRect(0, 0, width, height);
        context.drawImage(background.canvas, 0, 0);
        context.drawImage(textCanvas, x - boxborderw, y - boxborderw);
        return true;
    };
    return [
        new Asset_1.default(background.duration, width, height, canvas, context, render, () => {
            disposeCanvas();
            disposeText();
        }),
    ];
};
exports.default = drawtext;
//# sourceMappingURL=drawtext.js.map