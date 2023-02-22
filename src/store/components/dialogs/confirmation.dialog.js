import {defineStore} from 'pinia'

export default defineStore('confirmationDialog', {
  state: () => ({
    show: false,
    data: {}
  }),
  getters: {
    getShow: (state) => state['show'],
    getData: (state) => state['data']
  },
  actions: {
    async routeLeave (data) {
      this.show = true
      this.data = data
      return new Promise((resolve) => {
        this.data.action = resolve
      })
    },
    async open(data) {
      this.show = true
      this.data = data
    },
    async close() {
      this.show = false
      return true
    },
    async reset() {
      this.data = {}
      return true
    }
  },
})
