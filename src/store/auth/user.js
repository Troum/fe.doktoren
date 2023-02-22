import {defineStore} from 'pinia'
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies()

export default defineStore('user', {
  getters: {
    getUser: () => {
      return cookies.get('auth')['user']
    }
  },
  actions: {
    logout: () => {
      cookies.remove('auth')
    }
  }
})
