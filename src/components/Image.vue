<script setup lang="ts">
interface IImageProps {
  imgSrc: string | undefined;
}

const props = defineProps<IImageProps>();
</script>

<template>
  <div class="wrapper">
    <img id="preview" class="preview" :src="props.imgSrc" />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 20px;
  background-color: var(--blurred-bg);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>