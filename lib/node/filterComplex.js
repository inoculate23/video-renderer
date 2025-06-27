"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComplexFilter_1 = require("../shared/ComplexFilter");
exports.escapeSpecialChars = (str) => str
    .replace(/\'/g, '\\\\\\\u0027')
    .replace(/,/g, '\\,')
    .replace(/:/g, '\\\\:')
    .replace(/;/g, '\\;');
exports.extractFilterArgs = (f, name) => {
    const value = (f.args || {})[name];
    const argValue = f.name === 'drawtext' && name === 'text' ? exports.escapeSpecialChars(`${value}`) : value;
    return `${name}=${argValue}`;
};
function filterComplex(filters) {
    return filters
        .map((f) => {
        return `${(f.inputs || [])
            .map((i) => typeof i === 'string'
            ? `[${i}]`
            : `[${i.name}${i.kind === ComplexFilter_1.FilterInputKind.AudioOnly ? ':a' : i.kind === ComplexFilter_1.FilterInputKind.VideoOnly ? ':v' : ''}]`)
            .join('')}${f.name}=${Object.keys(f.args || {})
            .map((name) => exports.extractFilterArgs(f, name))
            .join(':')}${(f.outputs || []).map((name) => `[${name}]`).join('')}`;
    })
        .join(',');
}
exports.default = filterComplex;
//# sourceMappingURL=filterComplex.js.map