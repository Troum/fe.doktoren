import {defineStore} from 'pinia'
import Api from "@/classes/api";
import _ from "lodash-es";
export default defineStore('positions', {
  state: () => ({
    positions: [],
    position: {}
  }),
  getters: {
    getPositions: (state) => state['positions'],
    getPosition: (state) => state['position'],
  },
  actions: {
    async index() {
      await Api
        .positions()
        .index()
        .then((response) => this.setPositions(response.data.items))
    },
    async store(data) {
      return await Api
        .positions()
        .store(data)
    },
    async show(id) {
      await Api
        .positions()
        .show(id)
    },
    async update(id, data) {
      return await Api
        .positions()
        .update(id, data)
    },
    async destroy(id) {
      return await Api
        .positions()
        .destroy(id)
        .then((response) => this.setPositions(response.data.items))
    },
    setPositions(positions) {
      this.positions = positions
    },
    getPositionForList(value){
      return _.find(this.positions, { id: value } )?.name
    },
  },
})
