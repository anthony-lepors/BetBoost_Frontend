<template>
  <HelloWorld />
</template>

<script setup>
  import HelloWorld from '@/components/HelloWorld.vue'

  import { useAuthStore } from '@/store/auth';

  const authStore = useAuthStore();

  import { onMounted } from 'vue'

  onMounted(() => {
    authStore.getUser();
    console.log(authStore.user);
  })  

</script>
