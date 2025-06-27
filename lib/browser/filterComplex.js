"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filters_1 = require("./filters");
const faf = require('fast-af/deepEqual');
const getEmptyCache = () => ({ recordHash: new Map(), allRecords: new Set() });
function filterComplexCached(inputsAssets, complexFilters, oldCache = getEmptyCache()) {
    const sources = new Map();
    inputsAssets.map((asset, index) => {
        sources.set(`${index}`, asset);
    });
    let defaultInput = inputsAssets[0];
    const newCache = getEmptyCache();
    const getOutputAssets = (inputs, filter) => {
        let inputsArr = inputs;
        const oldFilterCaches = oldCache.recordHash.get(filter.name);
        const newFilterCaches = newCache.recordHash.get(filter.name) || [];
        newCache.recordHash.set(filter.name, newFilterCaches);
        if (oldFilterCaches) {
            for (const cacheItem of oldFilterCaches) {
                if (cacheItem.inputs.length === inputsArr.length &&
                    cacheItem.inputs.every((input, j) => input === inputsArr[j]) &&
                    faf.deepEqual(cacheItem.filter, filter)) {
                    newFilterCaches.push(cacheItem);
                    newCache.allRecords.add(cacheItem);
                    oldCache.allRecords.delete(cacheItem);
                    return cacheItem.outputs;
                }
            }
        }
        const f = filters_1.filters[filter.name];
        if (!f) {
            throw new Error('Could not find filter: ' + filter.name);
        }
        if (inputsArr.length === 0) {
            if (!defaultInput) {
                throw new Error(`${filter.name} does not specify an input, but there is no default input to use.`);
            }
            inputsArr = [defaultInput];
        }
        const outputsArr = f(inputsArr, filter.args || {});
        const outputCacheItem = { inputs: inputsArr, filter, outputs: outputsArr };
        newFilterCaches.push(outputCacheItem);
        newCache.allRecords.add(outputCacheItem);
        return outputsArr;
    };
    const outputs = complexFilters.reduce((_, filter) => {
        const inputs = (filter.inputs || []).map((input) => {
            const i = typeof input === 'string' ? input : input.name;
            const asset = sources.get(i);
            sources.delete(i);
            if (!asset) {
                throw new Error(`${filter.name}: [${i}] is not provided or has already been used.`);
            }
            return asset;
        });
        const outputAssets = getOutputAssets(inputs, filter);
        (filter.outputs || []).forEach((name, i) => {
            if (outputAssets.length <= i) {
                throw new Error(`${filter.name} only has ${outputAssets.length} outputs.`);
            }
            sources.set(name, outputAssets[i]);
        });
        if (!filter.outputs || filter.outputs.length === 0) {
            defaultInput = outputAssets[0];
        }
        else {
            defaultInput = null;
        }
        return outputAssets;
    }, []);
    if (outputs.length !== 1) {
        throw new Error('Complex filter should have exactly one final output');
    }
    // Clean cache records that are not present in the new cache
    oldCache.allRecords.forEach((r) => {
        r.outputs.forEach((o) => o.dispose());
    });
    return { output: outputs[0], cache: newCache };
}
exports.filterComplexCached = filterComplexCached;
function filterComplex(inputs, complexFilters) {
    return filterComplexCached(inputs, complexFilters).output;
}
exports.default = filterComplex;
//# sourceMappingURL=filterComplex.js.map