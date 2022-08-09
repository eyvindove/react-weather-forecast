import { createSlice } from '@reduxjs/toolkit'
import {
  GetDirectGeocoding,
  GetCurrentWeather,
  GetForecast,
} from '../../api/openWeatherAPI'

export const weatherForecastSlice = createSlice({
  name: 'weatherForecast',
  initialState: {
    coords: {
      latitude: 0,
      longitude: 0,
    },
    geocodingList: [],
    selectedCity: {},
    currentWeather: {},
    forecast: {},
  },
  reducers: {
    setCoords: (state, action) => {
      state.coords = action.payload
    },

    setGeocodingList: (state, action) => {
      state.geocodingList = action.payload
    },

    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload
    },

    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload
    },

    setForecast: (state, action) => {
      state.forecast = action.payload
    },
  },
})

export const {
  setCoords,
  setGeocodingList,
  setSelectedCity,
  setCurrentWeather,
  setForecast,
} = weatherForecastSlice.actions

export const coordsInfo = state => state.weatherForecast.coords
export const citiesList = state => state.weatherForecast.geocodingList
export const cityCurrentWeather = state => state.weatherForecast.currentWeather
export const cityForecastWeather = state => state.weatherForecast.forecast

export const getDirectGeocodingList = (searchText) => {
  return async (dispatch) => {
    try {
      if (!searchText) {
        dispatch(setGeocodingList([]))
        return
      }

      await GetDirectGeocoding({ q: searchText })
        .then(res => {
          dispatch(setGeocodingList(res))
        })
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export const getCurrentWeather = () => {
  return async (dispatch, getState) => {
    const { weatherForecast } = getState()

    try {
      await GetCurrentWeather({
        latitude: weatherForecast.coords.latitude,
        longitude: weatherForecast.coords.longitude,
      })
        .then(res => {
          dispatch(setCurrentWeather(res))
        })
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export const getForecast = () => {
  return async (dispatch, getState) => {
    const { weatherForecast } = getState()

    try {
      await GetForecast({
        latitude: weatherForecast.coords.latitude,
        longitude: weatherForecast.coords.longitude,
      })
        .then(res => {
          dispatch(setForecast(res))
        })
    } catch (err) {
      return Promise.reject(err)
    }
  }
}


export default weatherForecastSlice.reducer
