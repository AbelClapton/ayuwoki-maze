<script setup lang="ts">
import { computed } from 'vue'
import { Cell } from '@/libraries/Cell'

const { cell, cellSize } = defineProps<{ cell: Cell, cellSize: number }>()

const wallBackgroundTemplate = 'linear-gradient(to replace, transparent 98%, black 0%)';

const knownNeighbours = cell.neighbours;

const { rows: totalRows, columns: totalColumns } = cell.maze;
const { x, y } = cell;

const replaceTemplate = (key: string) => {
  return wallBackgroundTemplate.replace('replace', key === 'down' ? 'bottom' :(key === 'up' ? 'top' : key));
}

const directionToPaint = ['right', 'left', 'down', 'up'];

const walls = computed(() => {
  return {
    backgroundColor: cell.fog ? '#aaa' : ''
  }
})


const wallBackground = computed(() => {
  return {
    backgroundImage: directionToPaint.map(key => {

      if (knownNeighbours[key]) return;

      switch (key) {
        case 'right':
          return (totalColumns === x + 1) ? replaceTemplate(key) : '';
        case 'down':
          return (totalRows === y + 1) ? replaceTemplate(key) : '';
        default:
          return replaceTemplate(key);
      }
    }).filter(v => v).join(',')
  };

})
</script>

<template>
  <div class="cell" :style="walls">
    <div class="background-line" :style="wallBackground"></div>
    <slot />
  </div>
</template>

<style scoped>
.cell {
  display: grid;
  place-content: center;
  position: relative;
}

.background-line {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
