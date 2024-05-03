<template>

    <header>
      <NavBar />
    </header>
  
    <div class="card-list" v-if="!utility_store.show_map">
        <section class="cards p-16 pr-32 pl-32 flex flex-wrap">
            <Cards v-for="accomodation in api_store.api_filtered_results" :key="accomodation.id"
            :prop_accomodation="accomodation" @goToSingleAccomodation="goToSingleAccomodation(accomodation)" />
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
    components: { NavBar, Cards, MapVue },
  
    async mounted() {
  
      console.warn = function () { };
      await this.api_store.getApiKey();
      await this.api_store.getFilteredAccomodations();
      await this.map_store.createMap()
      if (this.api_store.selected_position) {
        this.map_store.flyTo(this.api_store.selected_position)
        this.map_store.setMarkers(this.api_store.api_unpaginated_results)
      }
    },
    methods: {
      async openMap() {
  
        this.utility_store.show_map = !this.utility_store.show_map
        setTimeout(() => {
          this.map_store.map_istance.resize()
        }, 10)
      },
  
      goToSingleAccomodation(accomodation) {
        this.$router.push({ name: 'SingleAccomodation', params: { id: accomodation?.id, slug: this.utility_store.createSlug(accomodation?.title) } })
        this.api_store.single_accomodation = accomodation
      },
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
  
  .gradient-background {
    background: linear-gradient(135deg, #00CBD8, #B844FF);
  }
  </style>