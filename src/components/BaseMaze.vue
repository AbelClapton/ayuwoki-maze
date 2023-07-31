<script setup lang="ts">
import { ref } from 'vue'
import BaseCell from '@/components/BaseCell.vue'
import BaseCharacter from '@/components/BaseCharacter.vue'
import { type Maze as MazeProps } from '@/types'
import { Maze } from '@/libraries/Maze'
import { usePlayer } from '@/composables'

const props = defineProps<MazeProps>()
const maze = ref(new Maze(props.rows, props.cols))
const { player } = usePlayer({ x: 0, y: 0 }, maze)
</script>

<template>
  <div class="maze">
    <base-cell v-for="cell of maze.cells" :key="cell.x + cell.y * props.cols" :cell="cell" :cell-size= "props.cellSize" />
    <base-character :x="player.x" :y="player.y" :size="props.cellSize" />
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
