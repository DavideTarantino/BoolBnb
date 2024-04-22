<script>
  import { RouterLink, RouterView } from 'vue-router'

  export default{
    components: {
      NavBar,
      Cards
    },
    data(){
      return{}
    }
  }
</script>

<template>
  <header>
    <RouterView />
  </header>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  </template>

<style scoped>

</style>
