import {defineStore} from 'pinia'
import Api from "@/classes/api";

export default defineStore('types', {
  state: () => ({
    types: [],
    type: {}
  }),
  getters: {
    getTypes: (state) => state['types'],
    getType: (state) => state['type']
  },
  actions: {
    async index() {
      await Api
        .types()
        .index()
        .then((response) => this.setTypes(response.data.items))
    },
    async store(data) {
      return await Api
        .types()
        .store(data)
    },
    async show(id) {
      await Api
        .types()
        .show(id)
    },
    async update(id, data) {
      return await Api
        .types()
        .update(id, data)
        .then((response) => {
          this.type = response.data.item
        })
    },
    async destroy(id) {
      return await Api
        .types()
        .destroy(id)
        .then((response) => this.setTypes(response.data.items))
    },
    setTypes(types) {
      this.types = types
    }
  },
})
