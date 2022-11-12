import type { CreateCanvasData } from "./models/ColorModel";
import type { CanvasObject } from "./models/ContextModel";

export const imageLoader = (): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image: HTMLImageElement | null = document.getElementById(
      "preview"
    ) as HTMLImageElement;
    if (image) {
      image.crossOrigin = "Anonymous";
      image.onload = () => resolve(image);
      image.onerror = () => reject(image);
    } else {
      reject(null);
    }
  });
};

export const createCanvas = async (
  type: CreateCanvasData,
  data: Blob | string
): Promise<CanvasObject | null> => {
  let url: string | null;
  switch (type) {
    case "file":
      url = URL.createObjectURL(data as Blob);
      break;
    case "link":
      url = data as string;
      break;
    default:
      url = null;
      break;
  }
  if (!url) {
    return null;
  }
  const image = await imageLoader();
  const canvas = document.createElement("canvas");
  canvas.setAttribute("visibility", "hidden");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(image, 0, 0);
    return { ctx, width: image.width, height: image.height };
  } else {
    console.error("context not found");
    return null;
  }
};
