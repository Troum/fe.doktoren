import {defineStore} from 'pinia'
import Api from "@/classes/api";

export default defineStore('specialities', {
  state: () => ({specialities: [], speciality: {}}),
  getters: {
    getSpecialities: (state) => state['specialities'],
    getSpeciality: (state) => state['speciality']
  },
  actions: {
    async index() {
      await Api
        .specialities()
        .index()
        .then((response) => this.setSpecialities(response.data.items))
    },
    async store(data) {
      return await Api
        .specialities()
        .store(data)
    },
    async show(id) {
      await Api
        .specialities()
        .show(id)
        .then((response) => {
          this.speciality = response.data.item
        })
    },
    async update(id, data) {
      return await Api
        .specialities()
        .update(id, data)
    },
    async destroy(id) {
      return await Api
        .specialities()
        .destroy(id)
        .then((response) => this.setSpecialities(response.data.items))
    },
    async avatar(data) {
      return await Api
        .specialities()
        .storeAvatar(data)
    },
    setSpecialities(data) {
      this.specialities = data
    }
  },
})
