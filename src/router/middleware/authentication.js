import Api from "@/classes/api";
import {
  centerStorage,
  universityStorage,
  specialityStorage,
  cityStorage,
  countryStorage,
  commonStorage,
  typeStorage, specializationStorage, positionStorage
} from "@/store";
import Loader from "@/classes/loader";

export default (to, from, next) => {

  Loader.routeChange().set(true)

  if (to.meta.authenticated) {
    Api.me()
      .then(() =>
        Api.index()
          .then((response) => {
            cityStorage().setCities(response.data.cities)
            centerStorage().setCenters(response.data.centers)
            universityStorage().setUniversities(response.data.universities)
            specialityStorage().setSpecialities(response.data.specialities)
            countryStorage().setCountries(response.data.countries)
            typeStorage().setTypes(response.data.types)
            specializationStorage().setSpecializations(response.data.specializations)
            positionStorage().setPositions(response.data.positions)
          })
      )
      .then(() => {
        next()
      })
      .catch(() => {
        next('/login')
      })
  }
  if (!to.meta.authenticated) {
    next()
  }
}
