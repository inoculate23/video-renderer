"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
const createCanvasAndContext_1 = __importDefault(require("../util/createCanvasAndContext"));
const expr_eval_1 = require("expr-eval");
const parser = new expr_eval_1.Parser();
const drawbox = ([background], args) => {
    const [canvas, context, disposeCanvas] = createCanvasAndContext_1.default();
    const { width, height } = background;
    canvas.width = width;
    canvas.height = height;
    const xExpression = parser.parse(String(args.x));
    const yExpression = parser.parse(String(args.y));
    const wExpression = parser.parse(String(args.w));
    const hExpression = parser.parse(String(args.h));
    // Evaluate expressions.
    const expressionArgs = {
        h: args.h,
        w: args.w,
        ih: height,
        iw: width,
    };
    const x = xExpression.evaluate(expressionArgs);
    const y = yExpression.evaluate(expressionArgs);
    const w = wExpression.evaluate(expressionArgs);
    const h = hExpression.evaluate(expressionArgs);
    const color = String(args.color) || '';
    const render = (time, initialFrame) => {
        if (!(background.renderFrame(time) || initialFrame)) {
            return false;
        }
        context.clearRect(0, 0, width, height);
        context.drawImage(background.canvas, 0, 0);
        context.fillStyle = color;
        context.fillRect(x, y, w, h);
        return true;
    };
    return [
        new Asset_1.default(background.duration, width, height, canvas, context, render, () => {
            disposeCanvas();
        }),
    ];
};
exports.default = drawbox;
//# sourceMappingURL=drawbox.js.map