<script setup lang="ts">
import { computed } from 'vue'
import { Cell } from '@/libraries/Cell'

const props = defineProps<{ cell: Cell }>()

const wall = '1px solid #aaa'
const walls = computed(() => {
  return {
    borderLeft: !props.cell.neighbours['left'] ? wall : '',
    borderRight: !props.cell.neighbours['right'] ? wall : '',
    borderTop: !props.cell.neighbours['up'] ? wall : '',
    borderBottom: !props.cell.neighbours['down'] ? wall : '',
    backgroundColor: props.cell.fog ? '#aaa' : ''
  }
})
</script>

<template>
  <div class="cell" :style="walls">
    <slot />
  </div>
</template>

<style scoped>
.cell {
  display: grid;
  place-content: center;
}
</style>
