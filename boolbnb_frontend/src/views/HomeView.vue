<template>
  <div class="overlay-mask h-full w-full z-10 fixed" v-show="utility_store.show_filters"></div>
  <AdvancedSearch v-show="utility_store.show_filters"></AdvancedSearch>
  <header>
    <NavBar />
  </header>

  <div class="card-list" v-if="!utility_store.show_map">
    <p class="text-center mt-5 gradient-background w-max mx-auto p-2 rounded-lg text-white" v-if="api_store.found_results > 0 && api_store.user_query">
      <strong class="text-black">{{ api_store.found_results }}</strong> results whitin <strong class="text-black">{{ api_store.filters.max_distance }}KM</strong> from "{{
        api_store.user_query }}"
    </p>
    <!-- <h1 class="text-5xl  text-rd-600" v-if="api_store.found_results == 0 && api_store.api_filtered_results">
      0 RESULTS
    </h1> -->
    <div class="flex flex-col mt-32 items-center" v-if="api_store.found_results == 0 && api_store.api_filtered_results">
      <strong class="text-2xl">No accommodation found in this area :( </strong>
      <p class="text-xl">Try searching for specific place or address</p>
    </div>

    <section class="cards p-16 pr-32 pl-32 flex flex-wrap justify-between">

      <Cards v-for="accomodation in api_store.api_filtered_results" :key="accomodation.id"
        :prop_accomodation="accomodation" />
    </section>
  </div>
  <!-- map is rendered with opacity-0 to avoid loadings and sizing bus -->
  <MapVue></MapVue>
  <div
    class="show-map flex items-center gap-2 text-white bg-[#222222] fixed py-3 px-4 rounded-2xl  text-sm font-bold  cursor-pointer"
    @click="openMap">
    <span>
      {{ utility_store.show_map ? 'Show List' : 'Show Map' }}
    </span>
    <i class="fa-solid" :class="utility_store.show_map ? 'fa-list' : 'fa-map'"></i>
  </div>




</template>

<script>
import NavBar from '../components/NavBar.vue'
import Cards from '../components/Cards.vue'
import AdvancedSearch from '@/components/AdvancedSearch.vue'
import MapVue from '@/components/MapVue.vue'
import { useApiStore } from '@/stores/apiStore'
import { useUtilityStore } from '@/stores/utilityStore'
import { useMapStore } from '@/stores/mapStore'

export default {
  data() {
    return {
      title: 'hello',
      api_store: useApiStore(),
      utility_store: useUtilityStore(),
      map_store: useMapStore()

    }
  },
  components: { NavBar, Cards, AdvancedSearch, MapVue },

  async mounted() {

    console.warn = function () { };
    await this.api_store.getApiKey();
    await this.api_store.getFilteredAccomodations();
    await this.map_store.createMap()
  },
  methods: {
    async openMap() {

      this.utility_store.show_map = !this.utility_store.show_map
      setTimeout(() => {
        this.map_store.map_istance.resize()
      }, 10)



    }
  },
}
</script>

<style scoped>
.cards {
  gap: 15px;
}

.overlay-mask {
  background-color: rgba(30, 30, 30, 0.5);
}

.map {
  width: 100vw;
  height: 100vh;
}



.show-map {
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.gradient-background{
        background: linear-gradient(135deg, #00CBD8, #B844FF);
    }
</style>