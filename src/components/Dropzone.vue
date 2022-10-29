<script setup lang="ts">
import UploadIcon from "./UploadIcon.vue";
</script>

<template>
  <div class="dropzone">
    <UploadIcon />
    <p>Drop you file here, or browse</p>
    <text>Supports only images</text>
  </div>
</template>

<style scoped>
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
</style>