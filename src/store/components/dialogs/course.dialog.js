import {defineStore} from 'pinia'

export default defineStore('courseDialog', {
  state: () => ({show: false, courses: []}),
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
