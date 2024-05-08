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
    pagination_links: undefined,
    last_page: undefined,
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
    found_results: 0,
    user_ip_address: undefined,

  }),
  getters: {

  },
  actions: {
    async getApiKey() {
      try {
        const res = await axios.get(this.backend_endpoint + '/get-api-key')
        this.tom_api_key = res.data.key
        // console.log(this.tom_api_key)
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

        // console.log(params)

        const res = await axios.get(this.db_endpoint, { params });

        if (res.data) {
          let returned_accomodations = res.data.res;
          console.log(res.data)
          this.pagination_links = returned_accomodations.links;
          console.log(returned_accomodations.links)
          this.last_page = returned_accomodations.last_page;
          // returned_accomodations.forEach(element => {
          //   element.pictures = element.pictures.slice(0, 5);
          // });
          this.api_filtered_results = returned_accomodations.data;

          this.found_results = res.data.res.total || 0;
          this.orderArray()

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
    },
    storeVisual: async function (id, ip) {
      const params = {
        accomodation_id: id,
        ip_address: ip
      }

      try {
        axios.post('http://127.0.0.1:8000/api/store-visual', params).then((res) => {
          console.log(res)
        })
      } catch (err) {
        console.log(err)
      }
    },
    async getIpAddress() {
      try {
        const res = await axios.get('https://api.ipify.org');
        this.user_ip_address = res.data;
        return res.data; // Return the IP address
      } catch (err) {
        console.log(err);
        throw err; // Rethrow the error to be caught by the caller
      }
    },
    orderArray() {
      const sponsoredAccommodations = [];
      const regularAccommodations = [];
      this.api_filtered_results.forEach(accommodation => {
        if (accommodation.has_ad) {
          sponsoredAccommodations.push(accommodation);
        } else {
          regularAccommodations.push(accommodation);
        }
      });

      // Sort sponsoredAccommodations based on order_by criteria
      switch (this.order_by) {
        case 'rating':
          sponsoredAccommodations.sort((a, b) => b.rating - a.rating); // Higher rating first
          break;
        case 'price':
          sponsoredAccommodations.sort((a, b) => a.price_per_night - b.price_per_night); // Cheaper first
          break;
        case 'distance':
          sponsoredAccommodations.sort((a, b) => a.distance_from_user - b.distance_from_user); // Closest first
          break;
        default:
          // No sorting needed
          break;
      }

      // Concatenate the sorted sponsoredAccommodations with regularAccommodations
      this.api_filtered_results = sponsoredAccommodations.concat(regularAccommodations);
    }

  },
})