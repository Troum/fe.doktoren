import {defineStore} from 'pinia'
import _ from 'lodash-es'
export default defineStore('positions', {
  state: () => ({
    positions: [
      {
        id: 1,
        name: 'Klinikdirector'
      },
      {
        id: 2,
        name: 'Chef'
      },
      {
        id: 3,
        name: 'Assistentenstelle'
      },
      {
        id: 4,
        name: 'Schwester'
      }
    ]
  }),
  getters: {
    getPositions: (state) => state['positions']
  },
  actions: {
    index() {
      //
    },
    getPosition(value) {
      return _.find(this.positions, {id: value})?.name
    }
  },
})
