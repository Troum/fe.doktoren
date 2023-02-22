import {defineStore} from 'pinia'
import _ from "lodash";

export default defineStore('educationDialog', {
  state: () => ({show: false, education: []}),
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
