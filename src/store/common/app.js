import {defineStore} from 'pinia'
export default defineStore('common', {
  state: () => ({
    genders: [
      {
        value: 'male',
        title: 'Male'
      },
      {
        value: 'female',
        title: 'Female'
      }
    ],
    ageGroups: [
      {
        value: 'children',
        title: 'Children'
      },
      {
        value: 'adult',
        title: 'Adults'
      },
      {
        value: 'all',
        title: 'Adults and children'
      }
    ],
    academyDegrees: [
      {
        value: 'bachelor',
        title: 'Bachelor'
      },
      {
        value: 'master',
        title: 'Master'
      },
      {
        value: 'staatsexamen',
        title: 'Staatsexamen',
      },
      {
        value: 'doktor',
        title: 'Doktor'
      }
    ],
    routeChanging: false,
    specializations: [],
    types: []
  }),
  getters: {
    getGenders: (state) => state['genders'],
    getAgeGroups: (state) => state['ageGroups'],
    getAcademyDegrees: (state) => state['academyDegrees'],
    getRouteChanging: (state) => state['routeChanging'],
    getSpecializations: (state) => state['specializations'],
    getTypes: (state) => state['types'],
  },
  actions: {
    onRouteChanging (status) {
      this.routeChanging = status
    },
    setSpecializations (specializations) {
      this.specializations = specializations
    },
    setTypes (types) {
      this.types = types
    }
  }
})
