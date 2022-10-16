<script setup lang="ts">
const emit = defineEmits(['onFileChanged'])

const onChange = ($event: Event) => {
  emit('onFileChanged', $event)
}
</script>

<template>
  <input type="file" @change="onChange($event)" accept="image/*" />
</template>

<style scoped>

</style>