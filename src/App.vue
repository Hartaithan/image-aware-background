<script setup lang="ts">
import { ref } from 'vue';
import Input from './components/Input.vue';
import MostUsed from './components/MostUsed.vue';
import type { IColor } from './models/ColorModel';
import { createCanvas } from './canvas';
import { getDominantColor } from './color';
import type { IInputMethods } from './models/InputModel';
import Dropzone from './components/Dropzone.vue';
import Image from './components/Image.vue';
import type { CanvasObject } from './models/ContextModel';
import Loader from './components/Loader.vue';

const imgSrc = ref<string | undefined>(undefined);
const background = ref<string | undefined>(undefined);
const colors = ref<IColor[]>([]);
const input = ref<IInputMethods | null>(null);
const isLoading = ref<boolean>(false);

const handleCanvas = (canvas: CanvasObject | null) => {
  if (canvas) {
    const blockSize = 5;
    const { ctx, width, height } = canvas;
    const { value, mostUsed } = getDominantColor(blockSize, ctx, width, height);
    colors.value = mostUsed;
    background.value = value.hex;
    console.info('dominant color', value);
    console.info('most used colors:');
    console.table(mostUsed);
  } else {
    console.error('canvas not found');
  }
};

const onPasteLink = async (link: string) => {
  isLoading.value = true;
  imgSrc.value = link;
  const canvas = await createCanvas('link', link, true);
  handleCanvas(canvas);
  isLoading.value = false;
};

const onFileChanged = async (files: FileList) => {
  isLoading.value = true;
  const image = files[0];
  imgSrc.value = URL.createObjectURL(image);
  const canvas = await createCanvas('file', image);
  handleCanvas(canvas);
  isLoading.value = false;
};

document.onpaste = (event: ClipboardEvent) => {
  if (!event.clipboardData) {
    return;
  }
  const data = { text: event.clipboardData.getData("text"), files: event.clipboardData.files };
  if (data.text) {
    onPasteLink(data.text);
  } else if (data.files && data.files.length > 0) {
    onFileChanged(data.files);
  } else {
    console.error('clipboard data error');
  }
};

const handlers = {
  onClick: () => input.value && input.value.onClick(),
  handleDrop: (event: DragEvent) => input.value && input.value.handleDrop(event),
  handleDragOver: (event: DragEvent) => input.value && input.value.handleDragOver(event),
  handleDragEnter: (event: DragEvent) => input.value && input.value.handleDragEnter(event),
  handleDragLeave: (event: DragEvent) => input.value && input.value.handleDragLeave(event),
};
</script>

<template>
  <div class="content" :style="{ background }">
    <div class="wrapper" @click="handlers.onClick" @drop="handlers.handleDrop" @dragover="handlers.handleDragOver"
      @dragenter="handlers.handleDragEnter" @dragleave="handlers.handleDragLeave">
      <Loader v-if="isLoading" />
      <Transition name="fade" mode="out-in">
        <Dropzone v-if="!imgSrc" />
        <Image v-else :imgSrc="imgSrc" />
      </Transition>
    </div>
    <Input ref="input" :imgSrc="imgSrc" @onFileChanged="onFileChanged" />
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

button {
  color: black
}

.wrapper {
  width: 600px;
  height: 600px;
  padding: 10px;
  position: relative;
  background-color: var(--blurred-bg);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;
}

@media (max-width: 1400px) {
  .wrapper {
    width: 500px;
    height: 500px;
  }
}

@media (max-width: 992px) {
  .wrapper {
    width: 400px;
    height: 400px;
  }
}

@media (max-width: 576px) {
  .wrapper {
    width: 320px;
    height: 320px;
  }
}

@media (max-width: 375px) {
  .wrapper {
    width: 250px;
    height: 250px;
  }
}
</style>
