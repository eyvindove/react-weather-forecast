import { openWeatherMapInstance } from './index'
import { apiKey, unit } from '../app/config'

export const GetDirectGeocoding = ({
  q,
}) => {
  return openWeatherMapInstance({
    method: 'get',
    url: 'geo/1.0/direct',
    params: {
      q,
      limit: 5,
      appid: apiKey,
    },
  })
}

export const GetCurrentWeather = ({
  latitude,
  longitude,
}) => {
  return openWeatherMapInstance({
    method: 'get',
    url: 'data/2.5/weather',
    params: {
      lat: latitude,
      lon: longitude,
      appid: apiKey,
      units: unit,
      lang: 'zh_tw',
    }
  })
}

export const GetForecast = ({
  latitude,
  longitude,
}) => {
  return openWeatherMapInstance({
    method: 'get',
    url: 'data/2.5/forecast',
    params: {
      lat: latitude,
      lon: longitude,
      appid: apiKey,
      units: unit,
      cnt: 9,
    }
  })
}
