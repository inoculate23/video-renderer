import ComplexFilter from '../shared/ComplexFilter';
export declare const escapeSpecialChars: (str: string) => string;
export declare const extractFilterArgs: (f: ComplexFilter, name: string) => string;
export default function filterComplex(filters: ComplexFilter[]): string;
