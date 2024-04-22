<script>
  import NavBar from './components/NavBar.vue'
  import Cards from './components/Cards.vue'

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
    <NavBar/>
  </header>
  <main class="p-16 flex flex-wrap gap-20 justify-center">
    <div v-for="index in 20" :key="index">
      <Cards/>
    </div>
  </main>
</template>

<style scoped>

</style>
