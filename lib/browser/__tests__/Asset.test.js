"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("../Asset"));
const createCanvasAndContext_1 = __importDefault(require("../util/createCanvasAndContext"));
const canvasPool_1 = __importDefault(require("../canvasPool"));
const clearRectMock = jest.fn();
const fillRectMock = jest.fn();
const drawImageMock = jest.fn();
class MockCanvas {
    constructor() {
        this.getContext = () => ({
            clearRect: clearRectMock,
            fillRect: fillRectMock,
            drawImage: drawImageMock,
        });
    }
}
const getAsset = (mockFunc) => {
    const [canvas, context, dispose] = createCanvasAndContext_1.default();
    return new Asset_1.default(0, 200, 200, canvas, context, () => {
        context.fillRect(0, 0, 200, 200);
        if (mockFunc)
            mockFunc();
        return true;
    }, dispose);
};
const getAssetPromise = async (mockFunc) => {
    return new Promise((resolve) => {
        const asset = getAsset(mockFunc);
        setTimeout(() => resolve(asset), 200);
    });
};
describe('Asset', () => {
    beforeEach(() => {
        // tslint:disable-next-line:deprecation
        document.createElement = jest.fn((t) => {
            if (t === 'canvas') {
                return new MockCanvas();
            }
            return {};
        });
    });
    afterEach(() => {
        canvasPool_1.default.clear();
        jest.resetAllMocks();
    });
    test('should create asset with simple render function', () => {
        const asset = getAsset();
        expect(asset.renderFrame(1)).toBe(true);
        expect(fillRectMock).toBeCalled();
    });
    describe('Asset.withPlaceholder', () => {
        test('should wrap a loading asset and show a placeholder until it is ready', async () => {
            const placeholderMock = jest.fn();
            const realAssetMock = jest.fn();
            const assetPromise = getAssetPromise(realAssetMock);
            const placeholder = getAsset(placeholderMock);
            const wrappedAsset = Asset_1.default.withPlaceholder(assetPromise, placeholder);
            wrappedAsset.renderFrame(1);
            expect(placeholderMock).toHaveBeenCalled();
            expect(realAssetMock).not.toBeCalled();
            await assetPromise;
            wrappedAsset.renderFrame(2);
            expect(realAssetMock).toBeCalled();
        });
    });
});
//# sourceMappingURL=Asset.test.js.map