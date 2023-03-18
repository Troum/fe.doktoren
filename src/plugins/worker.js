import _ from 'lodash'
export default {
  install: (app) => {
    const inArray = (array, predicate) => {
      return _.find(array, predicate) !== undefined
    }
    const removeFromArray = (array, predicate) => {
      array.splice(_.findIndex(array, predicate), 1)
    }
    app.provide("inArray", inArray);
    app.provide("removeFromArray", removeFromArray);
  }
}
