<script setup lang="ts">
import { ref } from 'vue'
import { Maze } from '@/libraries'

import { BaseCell, BasePlayer } from '@/components'
import { usePlayer } from '@/composables'
import { type Maze as MazeProps } from '@/types'

const props = defineProps<MazeProps>()
const maze = ref(new Maze(props.rows, props.cols))
const { player } = usePlayer({ x: 0, y: 0 }, maze)
</script>

<template>
  <div class="maze">
    <base-cell v-for="(cell, idx) of maze.cells" :key="idx" :cell="cell" />
    <base-player :x="player.x" :y="player.y" :size="props.cellSize" />
  </div>
</template>

<style scoped>
.maze {
  display: grid;
  grid-template-columns: repeat(v-bind(cols), v-bind(cellSize + 'px'));
  grid-template-rows: repeat(v-bind(rows), v-bind(cellSize + 'px'));

  position: relative;
}
</style>
