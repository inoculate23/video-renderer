import LoadAssetOptions from './util/LoadAssetOptions';
export default class Asset {
    static withPlaceholder(assetPromise: Promise<Asset>, placeholder: Asset): Asset;
    static fromImage(src: string, options?: LoadAssetOptions): Promise<Asset>;
    static transparentPixel(): Promise<Asset>;
    static fromVideo(src: string, options?: LoadAssetOptions): Promise<Asset>;
    static fromVideoWithAlpha(src: string, options?: LoadAssetOptions): Promise<Asset>;
    private _isInitialRender;
    private _renderFrame?;
    private _dispose?;
    duration: number;
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor(duration: number, width: number, height: number, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, renderFrame: (time: number, isInitialRender: boolean) => boolean, dispose?: () => void);
    /**
     * render a frame and return `true` if it updated
     */
    renderFrame: (time: number) => boolean;
    dispose(): void;
}
