<script setup lang="ts">
import { ref } from 'vue';
import DropzoneIcon from './DropzoneIcon.vue';

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
    <template v-if="!props.imgSrc">
      <div class="dropzone">
        <DropzoneIcon />
        <p>Drop you file here, or browse</p>
        <text>Supports only images</text>
      </div>
    </template>
    <img v-else id="preview" class="preview" :src="props.imgSrc" />
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

.dropzone {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed var(--primary-600);
  border-radius: 10px;
  cursor: pointer;
}

.dropzone>* {
  pointer-events: none;
}

.dropzone svg {
  width: 100px;
  height: 100px;
  fill: var(--primary-50);
  margin-bottom: 12px;
}

.dropzone p {
  font-size: 20px;
  margin-bottom: 6px;
}

.dropzone text {
  font-size: 14px;
}

.on-drag {
  border: 1px dashed var(--primary-100);
  background: var(--primary-900);
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>