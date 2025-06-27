import { ComplexFilter } from '../browser';
export interface Testcase {
    name: string;
    assets: string[];
    filters: ComplexFilter[];
}
export declare const testcases: Testcase[];
