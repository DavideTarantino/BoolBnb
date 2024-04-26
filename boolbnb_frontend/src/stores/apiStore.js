import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

export const useApiStore = defineStore('api_store', {
  state: () => ({
    //this could be different for some of us
    db_endpoint: 'http://127.0.0.1:8000/api/accommodations',
    //TODO - hide api key
    tom_api_key: '8Rmovsb8R8G88p20FduMGLj1mzLNxCZd',
    tom_endpoint: 'https://api.tomtom.com/',
    tom_search_endpoint: 'search/2/search/123%20main%20st.json?',
    home_api_response: [],
    api_filtered_results: undefined,
    user_query: '',
    distance_filter: 0,
    found_results: 0

  }),
  getters: {

  },
  actions: {
    getHomeAccomodations: async function (page) {
      return new Promise((resolve) => {
        const params = {
          page
        }
        axios.get(this.db_endpoint, params).then((res) => {
          let returned_accomodations = res.data.res.data
          returned_accomodations.forEach(element => {
            element.pictures = element.pictures.slice(0, 5)
          });
          this.home_api_response = returned_accomodations
          resolve(returned_accomodations)
        }).catch((err) => {
          console.log(err)
        })
      })

    },
    getFilteredAccomodations(page, position, filters) {
      console.log(position)
      return new Promise((resolve) => {
        const params = {
          max_distance: filters.max_distance || null,
          page,
          lat: position.lat,
          lng: position.lon
        }
        axios.get(this.db_endpoint, { params }).then((res) => {
          if (res.data) {
            let returned_accomodations = res.data.res.data
            returned_accomodations.forEach(element => {
              element.pictures = element.pictures.slice(0, 5)
            }); c
            this.api_filtered_results = returned_accomodations
            this.found_results = res.data.res.total || 0
          }
          if (!this.api_filtered_results) {
            this.api_filtered_results = []
          }
          console.log(this.api_filtered_results)


          resolve(returned_accomodations)
        }).catch((err) => {


        })
      })
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
    }

  },
})