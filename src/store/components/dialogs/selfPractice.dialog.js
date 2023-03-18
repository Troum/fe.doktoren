import {defineStore} from 'pinia'
export default defineStore('selfPracticeDialog', {
  state: () => ({show: false}),
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
