export declare enum CorsMode {
    Disabled = "disabled",
    Anonymous = "anonymous",
    UseCredentials = "use-credentials"
}
export declare function setCorsMode(element: HTMLVideoElement | HTMLImageElement, src: string, options: LoadAssetOptions): void;
export default interface LoadAssetOptions {
    crossOrigin?: CorsMode;
}
