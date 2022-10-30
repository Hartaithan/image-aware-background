<script setup lang="ts">
import type { IInputExposed } from '@/models/InputModel';
import { ref } from 'vue';

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

defineExpose<IInputExposed>({
  inputRef,
  onChange,
  onClick: onInputClick,
  handleDrop,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
});
</script>

<template>
  <input ref="inputRef" class="input" type="file" @change="onChange($event)" accept="image/*" />
</template>

<style scoped>
.input {
  display: none;
}

.on-drag {
  border: 1px dashed var(--primary-100);
  background: var(--primary-900);
}
</style>