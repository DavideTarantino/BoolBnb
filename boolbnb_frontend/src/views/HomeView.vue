<template>
  <header>
    <NavBar />
  </header>
  <section class="cards p-16 pr-32 pl-32 flex flex-wrap justify-between">
    <Cards v-for="(accomodation, index) in api_reponse" :key="accomodation.id" :prop_accomodation="accomodation" @click="goToSingleAccomodation(accomodation)"/>
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
  methods: {
    goToSingleAccomodation(accomodation) {
      this.$router.push({ name: 'SingleAccomodation', params: { id: accomodation?.id }})
      this.api_store.single_accomodation = accomodation
    },
  },
  components: { NavBar, Cards },
  async mounted() {
    let fetched_accomodations = await this.api_store.getHomeAccomodations(1);
    this.api_reponse = fetched_accomodations;
    console.log(this.api_reponse)
  }
}
</script>

<style scoped>
.cards {
  gap: 15px;
}
</style>