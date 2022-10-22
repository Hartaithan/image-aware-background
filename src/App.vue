<script setup lang="ts">
import { ref } from 'vue';
import Input from './components/Input.vue';
import { default as ImageComponent } from './components/Image.vue';

const file = ref<File | null>(null)
const imgSrc = ref<string | undefined>(undefined)
const background = ref<string | undefined>(undefined)

const getDominantColor = (ctx: CanvasRenderingContext2D) => {
  if (ctx) {
    const i = ctx.getImageData(0, 0, 1, 1).data
    const rgba = `rgba(${i[0]},${i[1]},${i[2]},${i[3]})`
    const hex = "#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1)
    console.info("dominant color:", rgba, hex)
    background.value = hex
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
      getDominantColor(ctx)
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
