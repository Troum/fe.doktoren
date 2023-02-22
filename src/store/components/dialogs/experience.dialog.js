import {defineStore} from 'pinia'
export default defineStore('experienceDialog', {
  state: () => ({show: false, experience: []}),
  getters: {
    showDialog: (state) => state['show']
  },
  actions: {
    async open() {
      this.show = true
      return true
    },
    close() {
      this.show = false
    }
  },
})
