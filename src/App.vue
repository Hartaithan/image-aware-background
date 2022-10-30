<script setup lang="ts">
import { ref } from 'vue';
import Input from './components/Input.vue';
import MostUsed from './components/MostUsed.vue';
import type { IColor } from './models/ColorModel';
import { createCanvas } from './canvas';

const file = ref<File | null>(null);
const imgSrc = ref<string | undefined>(undefined);
const background = ref<string | undefined>(undefined);
const colors = ref<IColor[]>([]);
const blockSize = 5;

const getDominantColor = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  if (ctx) {
    let n = -4;
    let count = 0;
    let rgb = { r: 0, g: 0, b: 0 };
    const image = ctx.getImageData(0, 0, width, height).data;

    const total: { [key: string]: number; } = {};

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
    Object.keys(total).sort((a, b) => total[b] - total[a]).forEach(key => {
      const data = key.split(',').map(Number);
      sorted.push({
        rgb: `rgb(${data[0]},${data[1]},${data[2]})`,
        hex: "#" + ((1 << 24) + (data[0] << 16) + (data[1] << 8) + data[2]).toString(16).slice(1)
      });
    });
    const mostUsed: IColor[] = [...sorted].splice(0, 5);

    colors.value = mostUsed;

    console.info("mostUsed:", JSON.stringify(mostUsed, null, 2));

    const color = {
      rgb: `rgb(${rgb.r},${rgb.g},${rgb.b})`,
      hex: "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)
    };
    background.value = color.hex;

    console.info("dominant color:", color);
  }
};

const onFileChanged = async (files: FileList) => {
  const image = files[0];
  file.value = image;
  imgSrc.value = URL.createObjectURL(image);
  const canvas = await createCanvas(image);
  if (canvas) {
    const { ctx, width, height } = canvas;
    getDominantColor(ctx, width, height);
  }
};
</script>

<template>
  <div class="content" :style="{ background }">
    <Input :imgSrc="imgSrc" @onFileChanged="onFileChanged" />
    <MostUsed :colors="colors" />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 1s ease-in;
}

.color {
  width: 100px;
  height: 100px;
}
</style>
