export interface IColor {
  rgb: string;
  hex: string;
}

export interface IRGB {
  r: number;
  g: number;
  b: number;
}

export interface IDominantColor {
  value: IColor;
  mostUsed: IColor[];
}
