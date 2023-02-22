import {defineStore} from 'pinia'
import Api from "@/classes/api";
import _ from "lodash-es";
import {avatarStorage} from "@/store";

export default defineStore('centers', {
  state: () => ({
    centers: [],
    center: {}
  }),
  getters: {
    getCenters: (state) => state['centers'],
    getCenter: (state) => state['center'],
  },
  actions: {
    async index() {
      await Api
        .centers()
        .index()
        .then((response) => this.setCenters(response.data.items))
    },
    async store(data) {
      return await Api
        .centers()
        .store(data)
    },
    async show(id) {
      await Api
        .centers()
        .show(id)
        .then((response) => {
          this.center = response.data.item
          avatarStorage().setPreview(response.data.item?.icon)
        })
    },
    async update(id, data) {
      return await Api
        .centers()
        .update(id, data)
    },
    async destroy(id) {
      return await Api
        .centers()
        .destroy(id)
        .then((response) => this.setCenters(response.data.items))
    },
    async avatar(data) {
      return await Api
        .centers()
        .storeAvatar(data)
    },
    getCenterForList(value){
      return _.find(this.centers, { id: value } )?.name
    },
    setCenters(data) {
      this.centers = data
    }
  },
})
