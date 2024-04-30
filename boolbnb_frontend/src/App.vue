<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onBeforeMount, ref } from 'vue';
import { useApiStore } from './stores/apiStore';



</script>

<template>
  <header>
    <RouterView />
  </header>
</template>

<style scoped></style>
