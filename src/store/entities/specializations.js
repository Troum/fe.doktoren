import {defineStore} from 'pinia'
import Api from "@/classes/api";

export default defineStore('specializations', {
  state: () => ({
    specializations: [],
    specialization: {}
  }),
  getters: {
    getSpecializations: (state) => state['specializations'],
    getSpecialization: (state) => state['specialization'],
  },
  actions: {
    async index() {
      await Api
        .specializations()
        .index()
        .then((response) => this.setSpecializations(response.data.items))
    },
    async store(data) {
      return await Api
        .specializations()
        .store(data)
    },
    async show(id) {
      await Api
        .specializations()
        .show(id)
    },
    async update(id, data) {
      return await Api
        .specializations()
        .update(id, data)
    },
    async destroy(id) {
      return await Api
        .specializations()
        .destroy(id)
        .then((response) => this.setSpecializations(response.data.items))
    },
    setSpecializations(specializations) {
      this.specializations = specializations
    }
  },
})
