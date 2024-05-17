import { ref, computed, toRaw } from 'vue'
import { defineStore } from 'pinia'
import { useUtilityStore } from './utilityStore'
import { useMapStore } from './mapStore'

import axios from 'axios'
import { orderBy } from 'lodash'

export const useApiStore = defineStore('api_store', {
  state: () => ({
    //this could be different for some of us
    csrfToken: '',
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
    user: undefined

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

          this.pagination_links = returned_accomodations.links;

          this.last_page = returned_accomodations.last_page;



          this.api_filtered_results = returned_accomodations.data;

          let uniqueAccommodations = [];

          // Set to keep track of seen IDs
          let seenIds = new Set();

          if (this.api_filtered_results && this.api_filtered_results.length > 0) {
            this.api_filtered_results.forEach(accommodation => {
              // Check if the ID has been seen before
              if (!seenIds.has(accommodation.id)) {
                // If not, add the accommodation to the uniqueAccommodations array
                uniqueAccommodations.push(accommodation);
                // Mark the ID as seen
                seenIds.add(accommodation.id);
              }
            });
          }

          // Iterate  through the array


          // Now uniqueAccommodations array will contain only unique accommodations based on ID
          this.api_filtered_results = uniqueAccommodations;

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

        })
      } catch (err) {
        console.log(err)
      }
    },
    async getIpAddress() {
      axios.defaults.withCredentials = false;
      try {
        const res = await axios.get('https://api.ipify.org');
        this.user_ip_address = res.data;
        return res.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    orderArray() {
      if (!this.api_filtered_results || this.api_filtered_results.length == 0) {
        return
      }
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
    },
    resetFilters() {
      this.filters.max_distance = 20
      this.filters.min_price = undefined
      this.filters.max_price = undefined
      this.filters.rooms = 'Any'
      this.filters.beds = 'Any'
      this.filters.bathrooms = 'Any'
      this.filters.type = undefined
      this.filters.services = []
    },
    async getCsrfToken() {

      // try {
      //   const response = await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
      //   console.log(response)
      // } catch (error) {
      //   console.error(error);
      // }
    },

    async getToken() {

    },
    async sendLoginRequest(email, password) {
      // axios.defaults.withCredentials = true;
      // axios.defaults.withXSRFToken = true;
      axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(async () => {
        const params = { email, password };
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/login', params);
          console.log(response.data);
          if (response.data.user) {
            this.user = response.data.user
            this.utility_store.show_login = false
          }
        } catch (error) {
          console.error(error); // Handle login error
        }
      })

    },
    async sendRegisterRequest(data) {


      try {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
        let formData = new FormData();
        formData.append('name', data.name);
        formData.append('surname', data.surname);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);
        formData.append('birth_date', data.birth_date);
        formData.append('phone_number', data.phone_number || '');
        if (data.user_propic) {
          formData.append('user_propic', data.user_propic);
        }
        const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.user) {
          this.user = response.data.user
          this.utility_store.show_register = false
        }
      } catch (error) {
        console.error(error.response.data);
      }
    }



  },
})