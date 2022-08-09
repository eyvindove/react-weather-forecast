import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Collapse,
  Container,
  Divider,
  Input,
  Spinner,
  Text,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import {
  setCoords,
  setSelectedCity,
  getDirectGeocodingList,
  getCurrentWeather,
  getForecast,
  citiesList,
} from './weatherForecastSlice.js'
import WeatherForecastHeader from './WeatherForecastHeader.jsx'
import WeatherForecastFooter from './WeatherForecastFooter.jsx'
import CurrentWeather from './CurrentWeather'
import ForecastWeather from './ForecastWeather.jsx'

export default function WeatherForecast () {
  const dispatch = useDispatch()
  const citiesOption = useSelector(citiesList)

  const toast = useToast()

  const setErrorToast = ({
    description,
  }) => {
    toast({
      title: 'Error!',
      description,
      status: 'error',
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        dispatch(setCoords({ latitude: location.coords.latitude, longitude: location.coords.longitude }))
        dispatch(getCurrentWeather())
        dispatch(getForecast())
      },
      (err) => {
        setErrorToast({ description: err })
      }
    )
  }, [])

  const { isOpen, onToggle } = useDisclosure()

  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        dispatch(getDirectGeocodingList(searchText))
      } catch (err) {
        setErrorToast({ description: err })
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchText])

  useEffect(() => {
    onToggle()
  }, [citiesOption])

  const selectCity = (city) => {
    setSearchText('')
    dispatch(setCoords({ latitude: city.lat, longitude: city.lon }))
    dispatch(setSelectedCity(city))
    dispatch(getCurrentWeather())
    dispatch(getForecast())
  }

  const showCitiesOption = citiesOption.map(item =>(
    <Box
      key={`${item.country}${item.state}${item.name}`}
      mt='2'
      p='10px'
      color='white'
      bg='teal.500'
      rounded='md'
      style={{ cursor: 'pointer' }}
      onClick={() => selectCity(item)}
    >
      {item.name}, {item.country} ({item.local_names?.zh || ''})
    </Box>
  ))

  const weatherContainerBlock = (
    <Container>
      <Input
        mt={4}
        placeholder='Please input city name'
        value={searchText}
        onChange={event => setSearchText(event.target.value)}
      />

      <Collapse in={citiesOption.length} animateOpacity>
        <Text fontSize='md' mt={2} color='teal.500'>Select a city...</Text>
        {citiesOption.length ? showCitiesOption : <Spinner mt='2' color='teal.500' />}

        <Divider my='2' />
      </Collapse>

      <CurrentWeather />
      <ForecastWeather />
    </Container>
  )

  return (
    <>
      <WeatherForecastHeader />

      {weatherContainerBlock}

      <WeatherForecastFooter />
    </>
  )
}
