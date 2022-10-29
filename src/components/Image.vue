<script setup lang="ts">
interface IImageProps {
  imgSrc: string | undefined;
}

const props = defineProps<IImageProps>();
</script>

<template>
  <img id="preview" class="preview" :src="props.imgSrc" />
</template>

<style scoped>
.preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>