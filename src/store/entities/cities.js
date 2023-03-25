import {defineStore} from 'pinia'
import Api from "@/classes/api";
import _ from "lodash";

export default defineStore('cities', {
  state: () => ({cities: [], city: {}}),
  getters: {
    getCities: (state) => state['cities'],
    getCity: (state) => state['city']
  },
  actions: {
    async index() {
      await Api
        .cities()
        .index()
        .then((response) => this.setCities(response.data.items))
    },
    async store(data) {
      await Api
        .cities()
        .store(data)
    },
    async show(id) {
      await Api
        .cities()
        .show(id)
        .then((response) => {
          this.city = response.data.item
        })
    },
    async update(id, data) {
      return await Api
        .cities()
        .update(id, data)
    },
    async destroy(id) {
      return await Api
        .cities()
        .destroy(id)
    },
    setCities(cities) {
      this.cities = cities
    },
    getCityForList (id) {
      return _.find(this.cities, {id: id})
    }
  },
})
