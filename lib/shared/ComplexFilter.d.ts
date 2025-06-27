export declare enum FilterInputKind {
    Both = 0,
    AudioOnly = 1,
    VideoOnly = 2
}
export interface FilterInput {
    kind: FilterInputKind;
    name: string;
}
export interface ComplexFilter {
    inputs?: Array<FilterInput | string>;
    outputs?: string[];
    name: string;
    args?: {
        [key: string]: string | number;
    };
}
export default ComplexFilter;
