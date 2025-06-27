"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function render(canvas, asset, fps) {
    if (asset) {
        canvas.width = asset.width;
        canvas.height = asset.height;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not create <canvas>.');
    }
    const handlers = [];
    let start = Date.now();
    let disposed = false;
    let pausedAt = null;
    let playing = false;
    function getTime() {
        if (pausedAt !== null) {
            return pausedAt;
        }
        if (!asset) {
            return 0;
        }
        const now = Date.now();
        let time = (now - start) / 1000;
        if (time > asset.duration) {
            time = 0;
            start = now;
        }
        return time;
    }
    function drawOnce() {
        if (!asset) {
            return;
        }
        const time = getTime();
        asset.renderFrame(time);
        ctx.clearRect(0, 0, asset.width, asset.height);
        ctx.drawImage(asset.canvas, 0, 0);
        if (handlers.length) {
            const state = { currentTime: time };
            handlers.forEach((h) => h(state));
        }
    }
    function draw() {
        if (disposed) {
            playing = false;
            return;
        }
        drawOnce();
        if (pausedAt !== null || disposed) {
            playing = false;
        }
        else {
            if (fps) {
                setTimeout(() => requestAnimationFrame(draw), 1000 / fps);
            }
            else {
                requestAnimationFrame(draw);
            }
        }
    }
    function ensurePlaying() {
        if (!playing) {
            playing = true;
            draw();
        }
    }
    ensurePlaying();
    return {
        setAsset(assetIn) {
            if (!asset || (asset.width !== assetIn.width || asset.height !== assetIn.height)) {
                canvas.width = assetIn.width;
                canvas.height = assetIn.height;
            }
            asset = assetIn; // tslint:disable-line no-parameter-reassignment
            if (!playing) {
                drawOnce();
            }
        },
        getAsset() {
            return asset;
        },
        isPaused() {
            return pausedAt !== null;
        },
        pause() {
            if (disposed) {
                throw new Error('Cannot pause after dispose');
            }
            pausedAt = getTime();
        },
        play() {
            if (disposed) {
                throw new Error('Cannot play after dispose');
            }
            pausedAt = null;
            ensurePlaying();
        },
        seek(time) {
            start = Date.now() - time;
            if (pausedAt !== null) {
                pausedAt = time;
            }
            if (!playing) {
                drawOnce();
            }
        },
        dispose() {
            disposed = true;
        },
        onFrame(handler) {
            handlers.push(handler);
            let unsubscribed = false;
            return () => {
                if (unsubscribed)
                    return;
                unsubscribed = true;
                handlers.splice(handlers.indexOf(handler), 1);
            };
        },
    };
}
exports.render = render;
exports.default = render;
//# sourceMappingURL=render.js.map