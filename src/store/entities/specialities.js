import {defineStore} from 'pinia'
import _ from 'lodash-es'
import Api from "@/classes/api";

export default defineStore('specialities', {
  state: () => ({specialities: []}),
  getters: {
    getSpecialities: (state) => state['specialities']
  },
  actions: {
    async index() {
      await Api.specialities().index()
        .then((response) => {
          this.setSpecialities(response.data.items)
        })
    },
    setSpecialities(data) {
      this.specialities = data
    }
  },
})
