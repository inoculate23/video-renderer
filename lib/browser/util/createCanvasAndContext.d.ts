declare type Dispose = () => void;
declare const createCanvasAndContext: () => [HTMLCanvasElement, CanvasRenderingContext2D, Dispose];
export default createCanvasAndContext;
