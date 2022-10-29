<script setup lang="ts">
import { ref } from 'vue';
import Dropzone from './Dropzone.vue';
import Image from './Image.vue';

interface IInputProps {
  imgSrc: string | undefined;
}

const props = defineProps<IInputProps>();
const emit = defineEmits(['onFileChanged']);
const inputRef = ref<HTMLInputElement | null>(null);

const onChange = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    emit('onFileChanged', target.files);
  }
};

const onInputClick = () => {
  if (inputRef.value) {
    inputRef.value.click();
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const target = event.target as HTMLInputElement;
  if (target && event.dataTransfer && event.dataTransfer.files) {
    emit('onFileChanged', event.dataTransfer.files);
  }
  target.classList.remove('on-drag');
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDragEnter = (event: DragEvent) => {
  const target = event.target as HTMLInputElement;
  target.classList.add('on-drag');
};

const handleDragLeave = (event: DragEvent) => {
  const target = event.target as HTMLInputElement;
  target.classList.remove('on-drag');
};

</script>

<template>
  <div class="wrapper" @click="onInputClick" @drop="handleDrop" @dragover="handleDragOver" @dragenter="handleDragEnter"
    @dragleave="handleDragLeave">
    <Dropzone v-if="!props.imgSrc" />
    <Image v-else :imgSrc="props.imgSrc" />
    <input ref="inputRef" class="input" type="file" @change="onChange($event)" accept="image/*" />
  </div>
</template>

<style scoped>
.wrapper {
  width: 600px;
  height: 600px;
  padding: 10px;
  background-color: var(--blurred-bg);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  cursor: pointer;
}

.input {
  display: none;
}

.on-drag {
  border: 1px dashed var(--primary-100);
  background: var(--primary-900);
}
</style>