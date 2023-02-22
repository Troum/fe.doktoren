import {defineStore} from 'pinia'
export default defineStore('loading', {
  state: () => ({
    loading: {
      action: false,
      submit: false
    }
  }),
  getters: {
    getActionLoading: (state) => state['loading']['action'],
    getSubmitLoading: (state) => state['loading']['submit']
  },
  actions: {
    setLoading(property, status) {
      this.loading[property] = status
    }
  }
})
