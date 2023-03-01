import {defineStore} from 'pinia'

export default defineStore('fileInput', {
  state: () => ({ file: null }),
  getters: {
    getFile: (state) => state['file']
  },
  actions: {
    setFile(file) {
      this.file = file
    }
  }
})
