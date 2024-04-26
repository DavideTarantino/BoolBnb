<template>
  <header>
    <NavBar />
  </header>
  <p v-if="api_store.found_results > 0">
    {{ api_store.found_results }} results whitin {{ api_store.distance_filter }}KM from {{
      api_store.user_query }}
  </p>
  <h1 class="text-5xl text-rd-600" v-if="api_store.found_results == 0 && api_store.api_filtered_results">
    0 RESULTS
  </h1>
  <section class="p-16 flex flex-wrap gap-20 justify-between" v-if="api_store.api_filtered_results == undefined">
    <Cards v-for="accomodation in api_store.home_api_response" :key="accomodation.id"
      :prop_accomodation="accomodation" />
  </section>
  <section class="p-16 flex flex-wrap gap-20 justify-between" v-else>
    <Cards v-for="accomodation in api_store.api_filtered_results" :key="accomodation.id"
      :prop_accomodation="accomodation" />
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

    }
  },
  components: { NavBar, Cards },
  async mounted() {
    await this.api_store.getHomeAccomodations(1);

  }
}
</script>

<style scoped></style>