<script setup lang="ts">
import { ref } from 'vue';

const file = ref<File | null>(null);
const imgSrc = ref<string | undefined>(undefined)

const onFileChanged = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    const image = target.files[0]
    file.value = image;
    imgSrc.value = URL.createObjectURL(image)
  }
}
</script>

<template>
  <input type="file" @change="onFileChanged($event)" accept="image/*" />
  <img :src="imgSrc" />
</template>

<style scoped>

</style>
