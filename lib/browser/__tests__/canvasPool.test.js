"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const canvasPool_1 = __importDefault(require("../canvasPool"));
class MockCanvas {
    constructor() {
        this._tainted = false;
        this.getContext = () => ({
            clearRect: () => undefined,
            getImageData: () => {
                if (this._tainted) {
                    throw new Error('Tainted canvas');
                }
            },
        });
    }
    taint() {
        this._tainted = true;
    }
}
// tslint:disable-next-line: deprecation
document.createElement = jest.fn((t) => {
    if (t === 'canvas') {
        return new MockCanvas();
    }
    return {};
});
describe('CanvasPool', () => {
    afterEach(() => {
        canvasPool_1.default.clear();
    });
    test('should create a canvas when no canvases are available', () => {
        const addedCanvas = canvasPool_1.default.get();
        expect(addedCanvas).toBeInstanceOf(MockCanvas);
    });
    test('should release canvases when they are put back the pool', () => {
        canvasPool_1.default.get();
        const canvasToRelease = canvasPool_1.default.get();
        canvasPool_1.default.get();
        canvasPool_1.default.get();
        canvasPool_1.default.put(canvasToRelease);
        const canvasFromPool = canvasPool_1.default.get();
        expect(canvasFromPool).toBe(canvasToRelease);
    });
    test('should not release canvases when they are tainted', () => {
        canvasPool_1.default.get();
        const canvasToRelease = canvasPool_1.default.get();
        canvasToRelease.taint();
        canvasPool_1.default.put(canvasToRelease);
        const canvasFromPool = canvasPool_1.default.get();
        expect(canvasFromPool).not.toBe(canvasToRelease);
    });
});
//# sourceMappingURL=canvasPool.test.js.map