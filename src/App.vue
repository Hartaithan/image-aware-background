<script setup lang="ts">
import { ref } from 'vue';
import Input from './components/Input.vue';
import { default as ImageComponent } from './components/Image.vue';
import MostUsed from './components/MostUsed.vue';

interface IColor {
  rgb: string;
  hex: string;
}

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

const createCanvas = (blob: File) => {
  const image = new Image();
  image.src = URL.createObjectURL(blob);
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute("visibility", "hidden");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(image, 0, 0);
      getDominantColor(ctx, image.width, image.height);
    }
  };
};

const onFileChanged = (files: FileList) => {
  const image = files[0];
  file.value = image;
  imgSrc.value = URL.createObjectURL(image);
  createCanvas(image);
};
</script>

<template>
  <div class="content" :style="{ background }">
    <div class="wrapper">
      <Input v-if="!imgSrc" @onFileChanged="onFileChanged" />
      <ImageComponent v-else :imgSrc="imgSrc" />
    </div>
    <template v-if="colors.length > 0">
      <MostUsed :colors="colors" />
    </template>
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
  transition: background 0.5s ease-in;
}

.wrapper {
  width: 600px;
  height: 600px;
}

.color {
  width: 100px;
  height: 100px;
}
</style>
