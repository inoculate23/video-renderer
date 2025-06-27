"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isTainted(ctx) {
    try {
        ctx.getImageData(0, 0, 1, 1);
        return false;
    }
    catch (err) {
        return true;
    }
}
exports.default = isTainted;
//# sourceMappingURL=isTainted.js.map