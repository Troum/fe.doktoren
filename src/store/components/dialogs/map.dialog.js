import {defineStore} from 'pinia'

export default defineStore('mapDialog', {
  state: () => ({show: false, src: null}),
  getters: {
    getShow: (state) => state['show'],
    getSrc: (state) => state['src']
  },
  actions: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
    async setSrc (src) {
      return this.src = src
    }
  },
})
