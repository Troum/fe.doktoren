import {defineStore} from 'pinia'
import Api from "@/classes/api";

export default defineStore('countries', {
  state: () => ({countries: [], country: {}}),
  getters: {
    getCountries: (state) => state['countries']
  },
  actions: {
    async index() {
      await Api
        .countries()
        .index()
        .then((response) => this.setCountries(response.data.items))
    },
    setCountries(countries) {
      this.countries = countries
    }
  },
})
