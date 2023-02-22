import {defineStore} from 'pinia'

export default defineStore('avatar', {
  state: () => ({blob: null, cropped: null, show: false, preview: null}),
  getters: {
    getEncoded: (state) => state['blob'],
    getFile: (state) => state['cropped'],
    getPreview: (state) => state['preview'],
    getState: (state) => state['show']
  },
  actions: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
      this.blob = null
    },
    setPreview(data) {
      this.preview = data
    },
    setCropped(blob) {
      this.cropped = new File([blob], 'avatar.png', {
        type: blob.type,
      })
    },
    setEncoded(data) {
      this.blob = data
    },
    resetAll() {
      this.blob = this.cropped = this.preview = null
    }
  },
})
