<script setup lang="ts">
import { ref } from 'vue';
import Input from './components/Input.vue';
import { default as ImageComponent } from './components/Image.vue';

const file = ref<File | null>(null)
const imgSrc = ref<string | undefined>(undefined)
const background = ref<string | undefined>(undefined)
const blockSize = 5

const getDominantColor = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  if (ctx) {
    let n = -4
    let count = 0
    let rgb = { r: 0, g: 0, b: 0 }
    const image = ctx.getImageData(0, 0, width, height).data

    while ((n += blockSize * 4) < image.length) {
      ++count;
      rgb.r += image[n];
      rgb.g += image[n + 1];
      rgb.b += image[n + 2];
    }

    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    const color = {
      rgb: `rgb(${rgb.r},${rgb.g},${rgb.b})`,
      hex: "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)
    }
    background.value = color.hex

    console.info("dominant color:", color)
  }
}

const createCanvas = (blob: File) => {
  const image = new Image()
  image.src = URL.createObjectURL(blob)
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.setAttribute("visibility", "hidden")
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.drawImage(image, 0, 0)
      getDominantColor(ctx, image.width, image.height)
    }
  }
}

const onFileChanged = (files: FileList) => {
  const image = files[0]
  file.value = image
  imgSrc.value = URL.createObjectURL(image)
  createCanvas(image)
}
</script>

<template>
  <div class="content" :style="{'background': background}">
    <div class="wrapper">
      <Input v-if="!imgSrc" @onFileChanged="onFileChanged" />
      <ImageComponent v-else :imgSrc="imgSrc" />
    </div>
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
}

.wrapper {
  width: 600px;
  height: 600px;
}
</style>
