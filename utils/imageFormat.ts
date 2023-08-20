import sharp from "sharp";
import { toCoverLargeFormat } from "./formatter";


export async function fetchImageToBuffer(url: string) :Promise<Buffer>{
    const response = await fetch(toCoverLargeFormat(url));
    const buffer = await response.arrayBuffer();
    return sharp(buffer).webp().toBuffer();
}