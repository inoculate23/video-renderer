import Asset from './Asset';
import ComplexFilter from '../shared/ComplexFilter';
interface AssetRecord {
    inputs: Asset[];
    filter: ComplexFilter;
    outputs: Asset[];
}
export interface FilterCache {
    recordHash: Map<string, AssetRecord[]>;
    allRecords: Set<AssetRecord>;
}
export declare function filterComplexCached(inputsAssets: ReadonlyArray<Asset>, complexFilters: ComplexFilter[], oldCache?: FilterCache): {
    output: Asset;
    cache: FilterCache;
};
export default function filterComplex(inputs: ReadonlyArray<Asset>, complexFilters: ComplexFilter[]): Asset;
export {};
