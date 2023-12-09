<script setup>
const themes = [
  {
    name: 'light',
    icon: 'bxs-sun',
  },
  {
    name: 'dark',
    icon: 'bxs-moon',
  },
];

import ThemeSwitcher from '@core/components/ThemeSwitcher.vue';
</script>

<template>
  <ThemeSwitcher :themes="themes" />
</template>
