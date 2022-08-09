
import { Center, Text, Link } from '@chakra-ui/react'

export default function WeatherForecastFooter () {
  return (
    <Center p={2} color='white' bg='teal.300'>
      <Text fontSize='xs'>
        Data from <Link href='https://openweathermap.org/'>OpenWeatherAPI</Link>.
      </Text>
    </Center>
  )
}
