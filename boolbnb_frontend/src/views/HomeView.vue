<template>
  <div class="overlay-mask h-full w-full z-10 fixed" v-show="utility_store.show_filters"></div>
  <AdvancedSearch v-show="utility_store.show_filters"></AdvancedSearch>
  <header>
    <NavBar />
  </header>


  <div class="card-list" v-if="!utility_store.show_map">

    <div class="flex justify-between mt-8 pr-32 pl-32 items-center">

      <div class="flex flex-col justify-center gap-10 items-center mx-auto xl:mx-0 md:flex-row">

        <div>
          <p class="font-medium text-center">
            <!-- v-if="api_store.found_results > 0 && api_store.user_query" -->
            {{ api_store.found_results }} accommodations near {{ api_store.user_query }}
          </p>
        </div>

        <div>
          <div class="filters p-3 border-2 rounded-full cursor-pointer flex gap-4 items-center" @click="() => {
            utility_store.show_filters = true
          }">
            <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
            </svg>

            <span>Filters</span>

            <div class="filters-counter text-white bg-black h-7 w-7 flex items-center justify-center rounded-full">
              <span>{{ filtersCount }}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="flex underline hidden xl:block">
        <div>
          Ordered by:
        </div>
        <select name="order" id="order" @change="handleSelectChange($event)">
          <option value="1">distance from your research</option>
          <option value="2">property rating</option>
          <option value="3">price (lower first)</option>

        </select>
      </div>

    </div>


    <!-- <h1 class="text-5xl  text-rd-600" v-if="api_store.found_results == 0 && api_store.api_filtered_results">
      0 RESULTS
    </h1> -->
    <div class="flex flex-col mt-32 items-center" v-if="api_store.found_results == 0 && api_store.api_filtered_results">
      <strong class="text-2xl">No accommodation found in this area :( </strong>
      <p class="text-xl">Try searching for specific place or address</p>
    </div>

    <!-- <section class="cards p-16 px-32 flex flex-wrap"> -->
    <section class="cards p-16 sm:p-20 xl:px-32 flex flex-wrap">

      <Cards v-for="accomodation in api_store.api_filtered_results" :key="accomodation.id"
        :prop_accomodation="accomodation" @goToSingleAccomodation="goToSingleAccomodation(accomodation)" />
    </section>

    <div class="mb-[150px] flex justify-center">
      <ul class="flex gap-2">
        <li class="cursor-pointer" @click="prevPage(api_store.page)">
          <i class="fa-solid fa-chevron-left"></i>
        </li>
        <!-- Display ellipsis before first page if there are hidden pages before -->
        <li v-show="shouldShowEllipsisBefore()">
          ...
        </li>
        <!-- Render page links based on the condition provided by shouldShowButton method -->
        <li class="cursor-pointer page-number" :class="{ 'active': link === api_store.page }"
          v-for="link in visiblePageLinks" :key="link" @click="changePage(link)">
          {{ link }}
        </li>
        <!-- Display ellipsis after last page if there are hidden pages after -->
        <li v-show="shouldShowEllipsisAfter()">
          ...
        </li>
        <li class="cursor-pointer" @click="nextPage(api_store.page)">
          <i class="fa-solid fa-chevron-right"></i>
        </li>
      </ul>

    </div>
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
import { FwbPagination } from 'flowbite-vue'
import { ref } from 'vue'

const currentPage = ref(1)

export default {
  data() {
    return {
      title: 'hello',
      api_store: useApiStore(),
      utility_store: useUtilityStore(),
      map_store: useMapStore(),
      api_filtered_results: [],
      maxVisiblePages: 6
    }
  },
  components: { NavBar, Cards, AdvancedSearch, MapVue, FwbPagination },

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
        let selected_position = [this.api_store.selected_position.lon, this.api_store.selected_position.lat]
        this.map_store.map_istance.resize()
        this.map_store.flyTo(selected_position)
      }, 10)
    },

    goToSingleAccomodation(accomodation) {
      this.$router.push({ name: 'SingleAccomodation', params: { id: accomodation?.id, slug: this.utility_store.createSlug(accomodation?.title) } })
      this.api_store.single_accomodation = accomodation
    },

    handleSelectChange(e) {
      console.log(e.target.value)
      if (e.target.value == 1) {
        this.api_store.order_by = 'distance'
      } else if (e.target.value == 2) {
        this.api_store.order_by = 'rating'
      } else if (e.target.value == 3) {
        this.api_store.order_by = 'price'
      }

      this.api_store.api_filtered_results = [];

      this.api_store.getFilteredAccomodations()
    },

    async changePage(number) {
      this.api_store.page = number
      await this.api_store.getFilteredAccomodations()
    },

    async prevPage(number) {
      if (number - 1 <= 0) {
        return
      }
      this.api_store.page = number - 1
      await this.api_store.getFilteredAccomodations()
    }
    ,

    async nextPage(number) {
      if (number + 1 > this.api_store.last_page) {
        return
      }
      this.api_store.page = number + 1
      await this.api_store.getFilteredAccomodations()
    },
    shouldShowButton(num) {
      if (num < this.page) { }
    },
    shouldShowEllipsisBefore() {
      return this.api_store.page > Math.ceil(this.maxVisiblePages / 2) + 1 && this.api_store.last_page > this.maxVisiblePages;
    },

    shouldShowEllipsisAfter() {
      return this.api_store.page < (this.api_store.last_page - (this.maxVisiblePages - 4)) && this.api_store.last_page > this.maxVisiblePages;
    }





  },
  computed: {
    filtersCount() {
      const originalFilters = {
        max_distance: 20,
        min_price: undefined,
        max_price: undefined,
        rooms: 'Any',
        beds: 'Any',
        bathrooms: 'Any',
        type: undefined,
        services: []
      };

      let count = 0;
      for (const key in this.api_store.filters) {
        if (this.api_store.filters.hasOwnProperty(key)) {
          if (Array.isArray(this.api_store.filters[key])) {
            // Treat services array differently: count as a filter if it's not empty
            if (this.api_store.filters[key].length > 0) {
              count++;
            }
          } else if (this.api_store.filters[key] !== originalFilters[key]) {
            // Compare other filters directly
            count++;
          }
        }
      }
      return count;
    },
    visiblePageLinks() {
      // Calculate start and end index for visible page links
      let startIndex = Math.max(1, this.api_store.page - Math.floor(this.maxVisiblePages / 2));
      let endIndex = Math.min(this.api_store.last_page, startIndex + this.maxVisiblePages - 1);

      // Adjust start index if endIndex is at the last page
      startIndex = Math.max(1, endIndex - this.maxVisiblePages + 1);

      // Generate an array of visible page links
      return Array.from({ length: endIndex - startIndex + 1 }, (_, index) => startIndex + index);
    }
  }
}
</script>

<style scoped>
.filters:hover {
  background-color: black;
  border-color: black;
  color: white;
}

.filters:hover svg {
  fill: white;
}

.filters:hover .filters-counter {
  background-color: white;
  color: black;
}

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

.active {
  background-color: black;
  color: white;
  padding-inline: 10px;
  border-radius: 5px;
}

.page-number {
  padding-inline: 10px;
}

.page-number:hover {
  background-color: black;
  color: white;
  padding-inline: 10px;
  border-radius: 5px;
}
</style>