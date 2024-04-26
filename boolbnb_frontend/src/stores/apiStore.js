import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useApiStore = defineStore('api_store', {
  state: () => ({
    //this could be different for some of us
    api_endpoint: 'http://127.0.0.1:8000/api/accommodations'
  }),
  getters: {

  },
  actions: {
    getHomeAccomodations: async function (page) {
      return new Promise((resolve) => {
        const params = {
          page
        }
        axios.get(this.api_endpoint, params).then((res) => {
          let returned_accomodations = res.data.res.data
          returned_accomodations.forEach(element => {
            element.pictures = element.pictures.slice(0,5)
          });
          resolve(returned_accomodations)
        }).catch((err) => {
          console.log(err)
        })
      })

    }
  },
})