<script setup lang="ts">
import { ref } from 'vue';
import Input from './components/Input.vue';
import MostUsed from './components/MostUsed.vue';
import type { IColor } from './models/ColorModel';
import { createCanvas } from './canvas';
import { getDominantColor } from './color';

const file = ref<File | null>(null);
const imgSrc = ref<string | undefined>(undefined);
const background = ref<string | undefined>(undefined);
const colors = ref<IColor[]>([]);

const onFileChanged = async (files: FileList) => {
  const image = files[0];
  file.value = image;
  imgSrc.value = URL.createObjectURL(image);
  const canvas = await createCanvas(image);
  if (canvas) {
    const blockSize = 5;
    const { ctx, width, height } = canvas;
    const { value, mostUsed } = getDominantColor(blockSize, ctx, width, height);
    colors.value = mostUsed;
    background.value = value.hex;
    console.info('dominant color', value);
    console.info('most used colors:');
    console.table(mostUsed);
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
