import {defineStore} from 'pinia'
import Api from "@/classes/api";
import {avatarStorage} from "@/store";

export default defineStore('doctors', {
  state: () => ({
    doctors: [],
    doctor: {}
  }),
  getters: {
    getDoctors: (state) => state['doctors'],
    getDoctor: (state) => state['doctor']
  },
  actions: {
    async index() {
      await Api
        .doctors()
        .index()
        .then((response) => this.doctors = response.data.items)
    },
    async store(data) {
      return await Api
        .doctors()
        .store(data)
    },
    async show(id) {
      await Api
        .doctors()
        .show(id)
        .then((response) => {
          this.doctor = response.data.item
          avatarStorage().setPreview(response.data.item?.avatar)
        })
    },
    async update(id, data) {
      return await Api
        .doctors()
        .update(id, data)
    },
    async destroy(id) {
      return await Api
        .doctors()
        .destroy(id)
        .then((response) => this.doctors = response.data.items)
    },
    async avatar(data) {
      return await Api
        .doctors()
        .storeAvatar(data)
    }
  },
})
