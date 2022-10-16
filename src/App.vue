<script setup lang="ts">
import { ref } from 'vue';
import Input from './components/Input.vue';
import { default as ImageComponent } from './components/Image.vue';

const file = ref<File | null>(null);
const imgSrc = ref<string | undefined>(undefined);

const getDominantColor = (ctx: CanvasRenderingContext2D) => {
  if (ctx) {
    const i = ctx.getImageData(0, 0, 1, 1).data;
    console.log(`rgba(${i[0]},${i[1]},${i[2]},${i[3]})`);
    console.log("#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1));
  }
}

const createCanvas = (blob: File) => {
  const image = new Image();
  image.src = URL.createObjectURL(blob);
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.setAttribute("visibility", "hidden");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(image, 0, 0);
      getDominantColor(ctx)
    }
  };
}

const onFileChanged = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    const image = target.files[0]
    file.value = image;
    imgSrc.value = URL.createObjectURL(image);
    createCanvas(image)
  }
}
</script>

<template>
  <div class="wrapper">
    <Input v-if="!imgSrc" @onFileChanged="onFileChanged" />
    <ImageComponent v-else :imgSrc="imgSrc" />
  </div>
</template>

<style scoped>
.wrapper {
  width: 600px;
  height: 600px;
}
</style>
