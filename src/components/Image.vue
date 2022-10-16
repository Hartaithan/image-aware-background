<script setup lang="ts">
const props = defineProps(['imgSrc'])
</script>

<template>
  <div class="wrapper">
    <img class="image" :src="props.imgSrc" />
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

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>