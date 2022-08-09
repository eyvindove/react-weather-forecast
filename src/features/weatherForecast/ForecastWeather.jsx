import { Flex, Text, Box } from '@chakra-ui/react'
import {
  AreaChart,
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useSelector } from 'react-redux'
import { cityForecastWeather } from './weatherForecastSlice'

export default function ForecastWeather () {
  const chartWidth = 280
  const chartHeight = 250

  const data = useSelector(cityForecastWeather)

  const dataComposed = data.list ? data.list.map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString(),
    temp: item.main?.temp,
    rain: item.rain?.['3h'],
    tempMin: item.main?.temp_min,
    humidity: item.main?.humidity,
  })) : []

  const dataTemperature = data.list ? data.list.map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString(),
    temp: item.main?.temp,
    feelsLike: item.main?.feels_like,
  })) : []

  const dataTemperatureRange = data.list ? data.list.map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString(),
    tempRange: [item.main?.temp_max, item.main?.temp_min],
  })) : []

  return (
    <>
      <Text mt='4' fontSize='lg'>ForeCast (3 hours / day)</Text>
      <Flex justify='center' wrap='wrap' mt='8'>
        <Box>
          <Text fontSize='md'>Composed Information</Text>
          <ComposedChart width={chartWidth} height={chartHeight} data={dataComposed}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" dataKey="temp" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="humidity" barSize={6} fill="#413ea0" />
            <Line type="monotone" dataKey="rain" stroke="#ff7300" />
          </ComposedChart>
        </Box>

        <Box>
          <Text fontSize='md'>Temperature</Text>
          <AreaChart width={chartWidth} height={chartHeight} data={dataTemperature} baseValue='dataMin'
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorFeelsLink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="feelsLike" stroke="#8884d8" fillOpacity={1} fill="url(#colorFeelsLink)" />
            <Area type="monotone" dataKey="temp" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </Box>

        <Box>
          <Text fontSize='md'>Temperature Range</Text>
          <AreaChart width={chartWidth} height={chartHeight} data={dataTemperatureRange} baseValue='dataMin'
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
            <XAxis dataKey="time" />
            <YAxis />
            <Area dataKey="tempRange" stroke="#8884d8" fill="#8884d8" />
            <Tooltip />
          </AreaChart>
        </Box>
      </Flex>
    </>
  )
}
