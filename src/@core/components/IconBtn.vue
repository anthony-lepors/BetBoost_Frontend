<!-- IconBtn.vue -->
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps(['icon', 'size', 'color', 'variant']);
</script>

<template>
  <VBtn v-bind="props">
    <VIcon :size="props.size" v-if="props.icon" />
    <slot></slot>
  </VBtn>
</template>
