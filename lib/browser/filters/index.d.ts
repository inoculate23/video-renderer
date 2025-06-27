import Asset from '../Asset';
export declare type Filter = (frames: Asset[], args: {
    [key: string]: string | number;
}) => Asset[];
export interface FiltersByName {
    [name: string]: Filter | undefined;
}
export declare const filters: FiltersByName;
