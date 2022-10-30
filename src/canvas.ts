import type { CanvasObject } from "./models/ContextModel";

export const imageLoader = (
  image: HTMLImageElement,
  url: string
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = () => reject(image);
  });
};

export const createCanvas = async (
  blob: File
): Promise<CanvasObject | null> => {
  const image = new Image();
  const url = URL.createObjectURL(blob);
  const loaded = await imageLoader(image, url);
  const canvas = document.createElement("canvas");
  canvas.setAttribute("visibility", "hidden");
  canvas.width = loaded.width;
  canvas.height = loaded.height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(image, 0, 0);
    return { ctx, width: image.width, height: image.height };
  } else {
    console.error("context not found");
    return null;
  }
};
