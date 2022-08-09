import { configureStore } from '@reduxjs/toolkit'
import weatherForecastReducer from '../features/weatherForecast/weatherForecastSlice'

export default configureStore({
  reducer: {
    weatherForecast: weatherForecastReducer,
  },
})
