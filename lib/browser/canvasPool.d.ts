export interface CanvasPool {
    /**
     * Get the next available canvas from the pool
     */
    get: () => HTMLCanvasElement;
    /**
     * Return a canvas to the pool. This function will clear the canvas for reuse
     */
    put: (canvas: HTMLCanvasElement) => void;
    /**
     * Empty the pool, destroying any references to canvas objects
     */
    clear: () => void;
}
declare const canvasPool: CanvasPool;
export default canvasPool;
