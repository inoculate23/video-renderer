import Asset from './Asset';
export interface RenderState {
    currentTime: number;
}
export interface Player {
    setAsset(asset: Asset): void;
    getAsset(): Asset | undefined;
    isPaused(): boolean;
    pause(): void;
    play(): void;
    seek(time: number): void;
    dispose(): void;
    onFrame(handler: (state: RenderState) => void): () => void;
}
export declare function render(canvas: HTMLCanvasElement, asset?: Asset, fps?: number): Player;
export default render;
