interface TextParams {
    text: string;
    fontsize: number;
    font: string;
}
declare const measureText: ({ text, font, fontsize }: TextParams) => {
    th: number;
    tw: number;
    end: number;
    start: number;
};
export default measureText;
