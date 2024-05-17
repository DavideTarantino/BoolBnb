<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onBeforeMount, ref, onMounted } from 'vue';
import { useApiStore } from './stores/apiStore';
import axios from 'axios';

onMounted(async () => {

  await useApiStore().getCsrfToken()
})

</script>

<template>
  <header>
    <RouterView />
  </header>
</template>

<style scoped></style>
