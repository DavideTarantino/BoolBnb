<script setup>
  import NavBar from '../components/NavBar.vue'
  import Cards from '../components/Cards.vue'
</script>

<template>
  <header>
    <NavBar/>
  </header>
  <main class="p-16 flex flex-wrap gap-20 justify-center">
      <div v-for="index in 15" :key="index">
        <Cards/>
      </div>
    </main>
  </template>

<style scoped>

</style>