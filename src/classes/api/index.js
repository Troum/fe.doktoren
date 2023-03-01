import {useCookies} from "vue3-cookies"
import axios from "axios";
import {responseStorage} from "@/store";

const baseURL = import.meta.env.VITE_APP_API_URL
const cityAPIkey = import.meta.env.VITE_APP_API_CITY
const positionStackAPIkey = import.meta.env.VITE_APP_API_POSITION_STACK
const {cookies} = useCookies()
const _axios = axios.create()

_axios.interceptors
  .response
  .use(function (response) {
    const responseStore = responseStorage()
    if (response.data.hasOwnProperty('message')) {
      responseStore.setColor('success')
      responseStore.setMessage(response.data.message)
      responseStore.open()
    }
    return response;
  }, function (error) {
    const responseStore = responseStorage()
    if (error.response.data.hasOwnProperty('message')) {
      responseStore.setColor('error')
      responseStore.setMessage(error.response.data.message)
      responseStore.open()
    }
    return Promise.reject(error);
  })
class API {
  prepareFormDataRequest(form) {
    const data = new FormData()
    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key)) {
        if (form[key] instanceof Array) {
          form[key].forEach(item => {
            if (item instanceof Object) {
              data.append(`${key}[]`, JSON.stringify(item))
            } else {
              data.append(`${key}[]`, item)
            }
          })
        } else {
          data.append(key, form[key])
        }
      }
    }
    return data
  }
  getCoordinates(city) {
    return _axios(
      {
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/city?name=${city}`,
        headers: {
          'X-Api-Key': `${cityAPIkey}`
        }
      }
    )
  }
  index() {
    return _axios(
      {
        method: 'GET',
        url: `${baseURL}/index`,
        headers: {
          Authorization: `Bearer ${cookies.get('auth')?.token}`
        }
      }
    )
  }

  me() {
    return _axios(
      {
        method: 'GET',
        url: `${baseURL}/me`,
        headers: {
          Authorization: `Bearer ${cookies.get('auth')?.token}`
        }
      }
    )
  }

  login(data) {
    return _axios(
      {
        method: 'POST',
        url: `${baseURL}/login`,
        data
      }
    )
  }

  logout() {
    return _axios({
      method: 'POST',
      url: `${baseURL}/logout`,
      headers: {
        Authorization: `Bearer ${cookies.get('auth')?.token}`
      }
    })
  }

  image(data) {
    return _axios({
      method: 'POST',
      url: `${baseURL}/image`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${cookies.get('auth')?.token}`
      },
      data
    })
  }

  doctors() {
    return {
      index: () => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/doctors`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      store: (data) => {
        return _axios({
          method: 'POST',
          url: `${baseURL}/doctors`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      storeAvatar: (form) => {
        const data = this.prepareFormDataRequest(form)
        return _axios({
          method: 'POST',
          url: `${baseURL}/avatar/doctors`,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      show: (doctor) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/doctors/${doctor}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      update: (doctor, data) => {
        return _axios({
          method: 'PATCH',
          url: `${baseURL}/doctors/${doctor}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      destroy: (doctor) => {
        return _axios({
          method: 'DELETE',
          url: `${baseURL}/doctors/${doctor}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      }
    }
  }

  specialities() {
    return {
      storeAvatar: (form) => {
        const data = this.prepareFormDataRequest(form)
        return _axios({
          method: 'POST',
          url: `${baseURL}/avatar/specialities`,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      index: () => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/specialities`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      store: (data) => {
        return _axios({
          method: 'POST',
          url: `${baseURL}/specialities`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      show: (speciality) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/specialities/${speciality}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      update: (speciality, data) => {
        return _axios({
          method: 'PATCH',
          url: `${baseURL}/specialities/${speciality}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      search: (name) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/search?model=specialities&needle=${name}`
        })
      },
      destroy: (speciality) => {
        return _axios({
          method: 'DELETE',
          url: `${baseURL}/specialities/${speciality}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      }
    }
  }

  centers() {
    return {
      storeAvatar: (form) => {
        const data = this.prepareFormDataRequest(form)
        return _axios({
          method: 'POST',
          url: `${baseURL}/avatar/centers`,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      index: () => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/centers`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      store: (data) => {
        return _axios({
          method: 'POST',
          url: `${baseURL}/centers`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      show: (center) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/centers/${center}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      update: (center, data) => {
        return _axios({
          method: 'PATCH',
          url: `${baseURL}/centers/${center}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      search: (name) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/search?model=centers&needle=${name}`
        })
      },
      destroy: (center) => {
        return _axios({
          method: 'DELETE',
          url: `${baseURL}/centers/${center}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      }
    }
  }

  positions() {
    return {
      index: () => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/positions`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      store: (data) => {
        return _axios({
          method: 'POST',
          url: `${baseURL}/positions`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      show: (position) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/positions/${position}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      update: (position, data) => {
        return _axios({
          method: 'PATCH',
          url: `${baseURL}/positions/${position}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      destroy: (position) => {
        return _axios({
          method: 'DELETE',
          url: `${baseURL}/positions/${position}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      }
    }
  }

  universities() {
    return {
      index: () => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/universities`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      store: (data) => {
        return _axios({
          method: 'POST',
          url: `${baseURL}/universities`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      show: (university) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/universities/${university}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      update: (university, data) => {
        return _axios({
          method: 'PATCH',
          url: `${baseURL}/universities/${university}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      search: (name) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/search?model=universities&needle=${name}`
        })
      },
      destroy: (university) => {
        return _axios({
          method: 'DELETE',
          url: `${baseURL}/universities/${university}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      }
    }
  }

  types() {
    return {
      index: () => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/types`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      store: (data) => {
        return _axios({
          method: 'POST',
          url: `${baseURL}/types`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      show: (type) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/types/${type}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      update: (type, data) => {
        return _axios({
          method: 'PATCH',
          url: `${baseURL}/types/${type}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      destroy: (type) => {
        return _axios({
          method: 'DELETE',
          url: `${baseURL}/types/${type}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      }
    }
  }

  countries() {
    return {
      index: () => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/countries`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      search: (name) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/search?model=countries&needle=${name}`
        })
      }
    }
  }

  cities() {
    return {
      index: () => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/cities`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      store: (data) => {
        return _axios({
          method: 'POST',
          url: `${baseURL}/cities`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      show: (city) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/cities/${city}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      update: (city, data) => {
        return _axios({
          method: 'PATCH',
          url: `${baseURL}/cities/${city}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      search: (name) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/search?model=cities&needle=${name}`
        })
      },
      destroy: (city) => {
        return _axios({
          method: 'DELETE',
          url: `${baseURL}/cities/${city}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      }
    }
  }

  specializations() {
    return {
      index: () => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/specializations`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      store: (data) => {
        return _axios({
          method: 'POST',
          url: `${baseURL}/specializations`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      show: (specialization) => {
        return _axios({
          method: 'GET',
          url: `${baseURL}/specializations/${specialization}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      },
      update: (specialization, data) => {
        return _axios({
          method: 'PATCH',
          url: `${baseURL}/specializations/${specialization}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          },
          data
        })
      },
      destroy: (specialization) => {
        return _axios({
          method: 'DELETE',
          url: `${baseURL}/specializations/${specialization}`,
          headers: {
            Authorization: `Bearer ${cookies.get('auth')?.token}`
          }
        })
      }
    }
  }
}

export default new API()
