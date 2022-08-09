import axios from 'axios'

export const openWeatherMapInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/',
})

openWeatherMapInstance.interceptors.response.use(
  (response) => {
    if (response.status >= 400 && response.status < 500) return Promise.reject()
    else if (response.status >= 500) return Promise.reject()
    else return response.data
  },
  (error) => {
    const errorMessage = `${error.response.status} - ${error.response.statusText}`

    return Promise.reject(errorMessage)
  }
)
