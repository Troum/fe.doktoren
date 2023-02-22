import {defineStore} from 'pinia'
import Api from "@/classes/api";
import {avatarStorage} from "@/store";

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
        .then((response) => this.setCities(response.data.items))
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
    async getCoordinates(city) {
      return Api
        .getCoordinates(city)
    },
    setCities(cities) {
      this.cities = cities
    }
  },
})
