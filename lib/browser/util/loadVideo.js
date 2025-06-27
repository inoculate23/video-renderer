"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoadAssetOptions_1 = require("./LoadAssetOptions");
const videoContainer = document.createElement('div');
videoContainer.style.position = 'fixed';
videoContainer.style.top = '0';
videoContainer.style.left = '0';
videoContainer.style.width = '1px';
videoContainer.style.height = '1px';
videoContainer.style.pointerEvents = 'none';
videoContainer.style.opacity = '0.000001';
document.body.appendChild(videoContainer);
async function loadVideo(src, options) {
    const video = document.createElement('video');
    await new Promise((resolve, reject) => {
        video.addEventListener('error', reject);
        video.addEventListener('canplay', () => resolve());
        videoContainer.appendChild(video);
        LoadAssetOptions_1.setCorsMode(video, src, options);
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.style.width = '1px';
        video.style.height = '1px';
        video.controls = false;
        video.src = src;
        video.setAttribute('playsinline', '');
    });
    return video;
}
exports.default = loadVideo;
//# sourceMappingURL=loadVideo.js.map