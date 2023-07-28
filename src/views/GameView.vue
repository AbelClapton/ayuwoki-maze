<script setup lang="ts">
import { BaseMaze } from '@/components'
</script>

<template>
  <main>
    <base-maze :rows="16" :cols="36" :cell-size="32" />
  </main>
</template>
