<script setup lang="ts">
import { type CSSProperties, computed } from 'vue'

const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  size: { type: Number, required: true }
})

const styleObject = computed<CSSProperties>(() => {
  return {
    width: `${props.size / 2}px`,
    height: `${props.size / 2}px`,
    left: `${props.x * props.size + props.size / 4}px`,
    top: `${props.y * props.size + props.size / 4}px`
  }
})
</script>

<template>
  <div class="player" :style="styleObject"></div>
</template>

<style scoped>
.player {
  position: absolute;
  background-color: #aaa;
}
</style>
