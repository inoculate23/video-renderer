"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createCanvasAndContext_1 = __importDefault(require("./util/createCanvasAndContext"));
const loadImage_1 = __importDefault(require("./util/loadImage"));
const loadVideo_1 = __importDefault(require("./util/loadVideo"));
const isTainted_1 = __importDefault(require("./util/isTainted"));
const noop = () => false;
const transparent1x1Pixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=';
class Asset {
    constructor(duration, width, height, canvas, context, renderFrame, dispose) {
        this._isInitialRender = true;
        /**
         * render a frame and return `true` if it updated
         */
        this.renderFrame = (time) => {
            if (!this._renderFrame) {
                throw new Error('This asset has already been disposed');
            }
            if (this._isInitialRender) {
                this._isInitialRender = false;
                return this._renderFrame(time, true);
            }
            return this._renderFrame(time, false);
        };
        this.duration = duration;
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.context = context;
        this._renderFrame = renderFrame;
        this._dispose = dispose;
    }
    static withPlaceholder(assetPromise, placeholder) {
        const { width, height, duration } = placeholder;
        const [canvas, context, dispose] = createCanvasAndContext_1.default();
        let renderedActualAsset = false;
        let asset;
        assetPromise
            .then((readyAsset) => {
            asset = readyAsset;
            if (!(asset.width === width && asset.height === height && asset.duration === duration)) {
                throw new Error('Loaded asset metadata must with match expected values');
            }
        })
            .catch((err) => console.error(err));
        placeholder.renderFrame(0);
        canvas.width = width;
        canvas.height = height;
        context.clearRect(0, 0, width, height);
        context.drawImage(placeholder.canvas, 0, 0);
        return new Asset(duration, width, height, canvas, context, (timestamp) => {
            const assetToRender = asset || placeholder;
            const didUpdate = assetToRender.renderFrame(timestamp);
            let shouldUpdate = didUpdate;
            if (!didUpdate && (renderedActualAsset || assetToRender === placeholder))
                return false;
            if (assetToRender === asset && !renderedActualAsset) {
                renderedActualAsset = true;
                shouldUpdate = true;
            }
            context.clearRect(0, 0, width, height);
            context.drawImage(assetToRender.canvas, 0, 0);
            return shouldUpdate;
        }, dispose);
    }
    static async fromImage(src, options = {}) {
        const [canvas, context, dispose] = createCanvasAndContext_1.default();
        const img = await loadImage_1.default(src, options);
        const width = img.width;
        const height = img.height;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(img, 0, 0);
        return new Asset(0, width, height, canvas, context, noop, dispose);
    }
    static async transparentPixel() {
        return Asset.fromImage(transparent1x1Pixel);
    }
    static async fromVideo(src, options = {}) {
        const [canvas, context, dispose] = createCanvasAndContext_1.default();
        const video = await loadVideo_1.default(src, options);
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        let seeking = false;
        return new Asset(video.duration, video.videoWidth, video.videoHeight, canvas, context, (timestamp) => {
            const t = timestamp % video.duration;
            if (Math.abs(video.currentTime - t) > 0.2 && !seeking && video.seekable) {
                seeking = true;
                setTimeout(() => {
                    seeking = false;
                }, 100);
                for (let i = 0; i < video.seekable.length; i++) {
                    if (video.seekable.start(i) < t && video.seekable.end(i) > t) {
                        video.currentTime = t;
                        break;
                    }
                }
            }
            context.drawImage(video, 0, 0);
            return true;
        }, () => {
            if (video.parentNode) {
                video.parentNode.removeChild(video);
            }
            dispose();
        });
    }
    static async fromVideoWithAlpha(src, options = {}) {
        const fullVideo = await Asset.fromVideo(src, options);
        const width = fullVideo.width;
        const height = fullVideo.height / 2;
        const [canvas, context, dispose] = createCanvasAndContext_1.default();
        canvas.width = width;
        canvas.height = height;
        const rawFrame = fullVideo.context;
        return new Asset(fullVideo.duration, width, height, canvas, context, (timestamp) => {
            fullVideo.renderFrame(timestamp);
            if (isTainted_1.default(context)) {
                throw new Error('Canvas has been tainted. You should add cors to the request for ' + src);
            }
            const image = rawFrame.getImageData(0, 0, width, height);
            const imageData = image.data;
            const alphaData = rawFrame.getImageData(0, height, width, height).data;
            for (let i = 3; i < imageData.length; i += 4) {
                imageData[i] = alphaData[i - 1];
            }
            context.putImageData(image, 0, 0, 0, 0, width, height);
            return true;
        }, () => {
            fullVideo.dispose();
            dispose();
        });
    }
    dispose() {
        if (this._dispose) {
            this._dispose();
        }
        this._renderFrame = undefined;
        this._dispose = undefined;
        this.canvas = undefined;
        this.context = undefined;
    }
}
exports.default = Asset;
//# sourceMappingURL=Asset.js.map