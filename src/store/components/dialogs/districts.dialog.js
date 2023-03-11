import {defineStore} from 'pinia'

export default defineStore('districtsDialog', {
  state: () => ({show: false}),
  getters: {
    showDialog: (state) => state['show']
  },
  actions: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    }
  },
})
