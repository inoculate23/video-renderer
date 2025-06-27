"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CorsMode;
(function (CorsMode) {
    CorsMode["Disabled"] = "disabled";
    CorsMode["Anonymous"] = "anonymous";
    CorsMode["UseCredentials"] = "use-credentials";
})(CorsMode = exports.CorsMode || (exports.CorsMode = {}));
function setCorsMode(element, src, options) {
    let corsMode = options.crossOrigin;
    if (!corsMode && /^https?\:\/\//.test(src) && src.indexOf(location.origin) !== 0) {
        corsMode = CorsMode.Anonymous;
    }
    if (corsMode && corsMode !== CorsMode.Disabled) {
        element.crossOrigin = corsMode;
    }
}
exports.setCorsMode = setCorsMode;
//# sourceMappingURL=LoadAssetOptions.js.map