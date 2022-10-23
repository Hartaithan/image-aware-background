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

p {
  font-weight: 600;
  text-shadow:
    1px 0 black,
    0 1px black,
    -1px 0 black,
    0 -1px black,
    -1px -1px black,
    -1px 1px black,
    1px -1px black,
    1px 1px black;
}

.color {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.color>p {
  letter-spacing: 0.5px;
}

.title {
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
}
</style>