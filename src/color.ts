import type { IColor, IDominantColor, IRGB } from "./models/ColorModel";

export const getDominantColor = (
  blockSize: number,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): IDominantColor => {
  let n = -4;
  let count = 0;
  const rgb: IRGB = { r: 0, g: 0, b: 0 };
  const image = ctx.getImageData(0, 0, width, height).data;

  const total: { [key: string]: number } = {};

  while ((n += blockSize * 4) < image.length) {
    ++count;
    const blockRgb = [image[n], image[n + 1], image[n + 2]];
    rgb.r += blockRgb[0];
    rgb.g += blockRgb[1];
    rgb.b += blockRgb[2];
    const block: string = `${blockRgb[0]},${blockRgb[1]},${blockRgb[2]}`;
    if (total[block]) {
      total[block] += 1;
    } else {
      total[block] = 1;
    }
  }

  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  const sorted: IColor[] = [];
  Object.keys(total)
    .sort((a, b) => total[b] - total[a])
    .forEach((key) => {
      const data = key.split(",").map(Number);
      sorted.push({
        rgb: `rgb(${data[0]},${data[1]},${data[2]})`,
        hex:
          "#" +
          ((1 << 24) + (data[0] << 16) + (data[1] << 8) + data[2])
            .toString(16)
            .slice(1),
      });
    });
  const mostUsed: IColor[] = [...sorted].splice(0, 5);
  const color: IColor = {
    rgb: `rgb(${rgb.r},${rgb.g},${rgb.b})`,
    hex:
      "#" +
      ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1),
  };
  return { value: color, mostUsed };
};
