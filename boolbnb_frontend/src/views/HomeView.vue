<template>
  <header>
    <NavBar />
  </header>
  <section class="p-16 flex flex-wrap gap-20 justify-between">

    <Cards v-for="(accomodation, index) in api_reponse" :key="accomodation.id" :prop_accomodation="accomodation" />
  </section>

</template>

<script>
import NavBar from '../components/NavBar.vue'
import Cards from '../components/Cards.vue'
import { useApiStore } from '@/stores/apiStore'

export default {
  data() {
    return {
      title: 'hello',
      api_store: useApiStore(),
      api_reponse: undefined
    }
  },
  components: { NavBar, Cards },
  async mounted() {
    let fetched_accomodations = await this.api_store.getHomeAccomodations(1);
    this.api_reponse = fetched_accomodations;
  }
}
</script>

<style scoped></style>