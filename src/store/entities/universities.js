import {defineStore} from 'pinia'
import Api from "@/classes/api";
import _ from "lodash-es";

export default defineStore('universities', {
  state: () => ({universities: [], university: {}}),
  getters: {
    getUniversities: (state) => state['universities'],
    getUniversity: (state) => state['university']
  },
  actions: {
    async index() {
      await Api
        .universities()
        .index()
        .then((response) => {
          this.setUniversities(response.data.items)
        })
    },
    async store(data) {
      await Api
        .universities()
        .store(data)
        .then((response) => this.setUniversities(response.data.items))
    },
    async show(id) {
      await Api
        .universities()
        .show(id)
        .then((response) => {
          this.university = response.data.item
        })
    },
    async update(id, data) {
      return Api
        .universities()
        .update(id, data)
    },
    getUniversityForList(value){
      return _.find(this.universities, { id: value } )?.name
    },
    setUniversities(data) {
      this.universities = data
    }
  },
})
