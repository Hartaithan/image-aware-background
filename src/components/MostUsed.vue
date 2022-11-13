<script setup lang="ts">
import type { IColor } from '@/models/ColorModel';

interface IMostUsedProps {
  colors: IColor[];
}

const props = defineProps<IMostUsedProps>();
</script>

<template>
  <div class="colors-wrapper">
    <p class="title">MOST USED COLORS</p>
    <div class="colors">
      <div class="color" v-for="(color, index) in props.colors" :id="'color' + (index + 1)" :key="color.hex"
        :style="{ background: color.hex }">
        <p>RGB: {{ color.rgb }}</p>
        <p>HEX: {{ color.hex }}</p>
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
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

@media (max-width: 992px) {
  .color {
    height: 60px;
  }

  .colors {
    height: auto;
    min-height: 70px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  #color1 {
    grid-area: 1 / 1 / 2 / 2;
  }

  #color2 {
    grid-area: 1 / 2 / 2 / 3;
  }

  #color3 {
    grid-area: 2 / 1 / 3 / 2;
  }

  #color4 {
    grid-area: 2 / 2 / 3 / 3;
  }

  #color5 {
    grid-area: 3 / 1 / 4 / 3;
  }
}

@media (max-width: 768px) {
  .color {
    height: 40px;
  }

  .color>p {
    font-size: 10px;
  }
}
</style>