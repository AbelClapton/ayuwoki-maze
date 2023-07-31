<script setup lang="ts">
import BaseMaze from '@/components/BaseMaze.vue'
</script>

<template>
  <main class="main">
    <base-maze :rows="3" :cols="3" :cell-size="60" />
  </main>
</template>
