<script setup lang="ts">
const props = defineProps(['colors']);
</script>

<template>
  <div class="colors-wrapper">
    <p class="title">MOST USED COLORS</p>
    <div class="colors">
      <div class="color" v-for="color in props.colors" :key="color.id" :style="{background: color.hex}">
        <p>RGB: {{color.rgb}}</p>
        <p>HEX: {{color.hex}}</p>
      </div>
    </div>
  </div>
</template>
    
<style scoped>
.colors-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.colors {
  display: flex;
  height: 70px;
}

.color {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.title {
  text-align: center;
  margin-bottom: 12px;
}
</style>