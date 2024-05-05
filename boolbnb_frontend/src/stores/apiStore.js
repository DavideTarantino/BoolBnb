import { ref, computed, toRaw } from 'vue'
import { defineStore } from 'pinia'
import { useUtilityStore } from './utilityStore'
import { useMapStore } from './mapStore'

import axios from 'axios'
import { orderBy } from 'lodash'

export const useApiStore = defineStore('api_store', {
  state: () => ({
    //this could be different for some of us
    backend_endpoint: 'http://127.0.0.1:8000/api',
    db_endpoint: 'http://127.0.0.1:8000/api/accommodations',
    filtered_endpoint: 'http://127.0.0.1:8000/api/filtered-accommodations',
    tom_api_key: undefined,
    tom_endpoint: 'https://api.tomtom.com/',
    tom_search_endpoint: 'search/2/search/123%20main%20st.json?',
    home_api_response: [],
    api_filtered_results: undefined,
    api_unpaginated_results: undefined,
    selected_position: undefined,
    single_accomodation: undefined,
    utility_store: useUtilityStore(),
    map_store: useMapStore(),
    user_query: '',
    page: 1,
    order_by: 'distance',
    filters: {
      max_distance: 20,
      min_price: undefined,
      max_price: undefined,
      rooms: 'Any',
      beds: 'Any',
      bathrooms: 'Any',
      type: undefined,
      services: []
    },
    found_results: 0

  }),
  getters: {

  },
  actions: {
    async getApiKey() {
      try {
        const res = await axios.get(this.backend_endpoint + '/get-api-key')
        this.tom_api_key = res.data.key
        console.log(this.tom_api_key)
      } catch (err) {
        console.log(err)
      }
    },
    async getFilteredAccomodations() {
      try {
        const params = {
          max_distance: this.filters.max_distance || null,
          page: this.page,
          lat: this.selected_position?.lat || null,
          lng: this.selected_position?.lon || null,
          min_price: this.filters.min_price,
          max_price: this.filters.max_price,
          type: this.filters.type || null,
          rooms: this.filters.rooms == 'Any' ? null : Number(this.filters.rooms),
          beds: this.filters.beds == 'Any' ? null : Number(this.filters.beds),
          bathrooms: this.filters.bathrooms == 'Any' ? null : Number(this.filters.bathrooms),
          services: this.filters.services || null,
          order_by: this.order_by || 'distance'
        };

        console.log(params)

        const res = await axios.get(this.db_endpoint, { params });

        if (res.data) {
          let returned_accomodations = res.data.res.data;
          console.log(returned_accomodations)
          // returned_accomodations.forEach(element => {
          //   element.pictures = element.pictures.slice(0, 5);
          // });
          this.api_filtered_results = returned_accomodations;
          this.found_results = res.data.res.total || 0;
        }

        if (!this.api_filtered_results) {
          this.api_filtered_results = [];
          return [];
        }

        return this.api_filtered_results;
      } catch (err) {
        console.error('Error in getFilteredAccomodations:', err);
        throw err; // Rethrow the error to propagate it up
      }
    },
    getAddressReccomandations: async function (search_string) {
      if (search_string.length < 5) {
        return
      }
      const params = {
        key: this.tom_api_key,
        query: search_string,
        countrySet: 'IT'
      };
      return new Promise((resolve, reject) => {
        axios.get(this.tom_endpoint + this.tom_search_endpoint, { params: params })
          .then((res) => {
            let address_suggestions = [];
            let top_five_results = res.data.results.slice(0, 5);

            top_five_results.forEach((el) => {
              let label = el.type == 'POI' ? el.poi.name : el.address.freeformAddress
              let res_obj = {
                address: label,
                position: el.position
              };
              address_suggestions.push(res_obj);
            });
            resolve(address_suggestions);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    async getMarkersData() {
      try {
        const params = {
          max_distance: this.filters.max_distance || null,
          page: this.page,
          lat: this.selected_position?.lat || null,
          lng: this.selected_position?.lon || null,
          min_price: this.filters.min_price,
          max_price: this.filters.max_price,
          type: this.filters.type || null,
          rooms: this.filters.rooms == 'Any' ? null : Number(this.filters.rooms),
          beds: this.filters.beds == 'Any' ? null : Number(this.filters.beds),
          bathrooms: this.filters.bathrooms == 'Any' ? null : Number(this.filters.bathrooms),
          services: this.filters.services || null
        };

        const res = await axios.get(this.filtered_endpoint, { params });

        if (res.data) {

          let returned_accomodations = res.data.res
          this.api_unpaginated_results = returned_accomodations;
        }

        if (!this.api_filtered_results) {
          this.api_unpaginated_results = [];
          return [];
        }

        return this.api_filtered_results;
      } catch (err) {
        console.error('Error in getting markers data:', err);
        throw err; // Rethrow the error to propagate it up
      }
    },

    getSingleAccomodation: async function (id) {
      axios.get(this.db_endpoint + "/" + id).then((res) => {
        this.single_accomodation = res.data.res
        this.map_store.createSingleMap(this.single_accomodation.longitude, this.single_accomodation.latitude)
        // await this.map_store.createSingleMap(this.api_store.single_accomodation.longitude, this.api_store.single_accomodation.latitude)
      })
    }
  },
})