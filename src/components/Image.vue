<script setup lang="ts">
const props = defineProps(['imgSrc'])
</script>

<template>
  <img :src="props.imgSrc" />
</template>

<style scoped>

</style>