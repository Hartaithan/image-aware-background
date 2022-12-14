import type { CreateCanvasData } from "./models/ColorModel";
import type { CanvasObject } from "./models/ContextModel";

export const imageLoader = (
  image: HTMLImageElement,
  url: string,
  proxy: boolean = false
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    image.crossOrigin = "Anonymous";
    switch (proxy) {
      case true:
        image.src = "https://api.allorigins.win/raw?url=" + url;
        break;
      default:
        image.src = url;
        break;
    }
    image.onload = () => resolve(image);
    image.onerror = () => reject(image);
  });
};

export const createCanvas = async (
  type: CreateCanvasData,
  data: Blob | string,
  proxy: boolean = false
): Promise<CanvasObject | null> => {
  const image = new Image();
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
  const loaded = await imageLoader(image, url, proxy);
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
