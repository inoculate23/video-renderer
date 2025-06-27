"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const { execute } = require('puppet-master');
const assetDir = path_1.join(__dirname, '..', '..', '..', 'assets');
const renderDemo = (assets, complexFilters) => execute({
    debug: true,
    func: (module, args) => {
        module.main(...args);
    },
    args: [
        assets.map((name) => 'data:image/png;base64,' + fs_1.readFileSync(path_1.join(assetDir, name), 'base64')),
        complexFilters,
    ],
    module: path_1.join(__dirname, 'renderDemo.chrome.ts'),
}).catch(console.error); // tslint:disable-line
exports.default = renderDemo;
//# sourceMappingURL=renderDemo.js.map