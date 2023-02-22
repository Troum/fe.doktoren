import {defineStore} from 'pinia'

export default defineStore('response', {
  state: () => ({color: null, message: null, show: false}),
  getters: {
    getColor: (state) => state['color'],
    getMessage: (state) => state['message'],
    getState: (state) => state['show']
  },
  actions: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
    setMessage(message) {
      this.message = message
    },
    setColor(color) {
      this.color = color
    }
  },
})
