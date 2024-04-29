<template>
  <div class="overlay-mask h-full w-full z-10 fixed" v-show="utility_store.show_filters"></div>
  <AdvancedSearch v-show="utility_store.show_filters"></AdvancedSearch>
  <header>
    <NavBar />
  </header>

  <MapVue></MapVue>



  <p v-if="api_store.found_results > 0 && api_store.user_query">
    {{ api_store.found_results }} results whitin {{ api_store.filters.max_distance }}KM from {{
      api_store.user_query }}
  </p>
  <h1 class="text-5xl text-rd-600" v-if="api_store.found_results == 0 && api_store.api_filtered_results">
    0 RESULTS
  </h1>
  <!-- <section class="cards p-16 pr-32 pl-32 flex flex-wrap justify-between"
    v-if="api_store.api_filtered_results == undefined">
    <Cards v-for="accomodation in api_store.home_api_response" :key="accomodation.id"
      :prop_accomodation="accomodation" />
  </section> -->
  <section class="cards p-16 pr-32 pl-32 flex flex-wrap justify-between">
    <Cards v-for="accomodation in api_store.api_filtered_results" :key="accomodation.id"
      :prop_accomodation="accomodation" />
  </section>


</template>

<script>
import NavBar from '../components/NavBar.vue'
import Cards from '../components/Cards.vue'
import AdvancedSearch from '@/components/AdvancedSearch.vue'
import MapVue from '@/components/MapVue.vue'
import { useApiStore } from '@/stores/apiStore'
import { useUtilityStore } from '@/stores/utilityStore'

export default {
  data() {
    return {
      title: 'hello',
      api_store: useApiStore(),
      utility_store: useUtilityStore()

    }
  },
  components: { NavBar, Cards, AdvancedSearch, MapVue },
  async mounted() {
    await this.api_store.getFilteredAccomodations();

  }
}
</script>

<style scoped>
.cards {
  gap: 15px;
}

.overlay-mask {
  background-color: rgba(30, 30, 30, 0.5);
}
</style>