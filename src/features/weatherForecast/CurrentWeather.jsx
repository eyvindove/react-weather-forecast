import { useSelector } from 'react-redux'
import {
  Box,
  Flex,
  Spacer,
  Image,
  Text,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react'
import { cityCurrentWeather } from './weatherForecastSlice'

export default function CurrentWeather () {
  const currentWeather = useSelector(cityCurrentWeather)

  const weatherDetail = currentWeather.weather?.[0]

  const displaySunrise = currentWeather.sys?.sunrise ?
    `${new Date(currentWeather.sys.sunrise * 1000).toString().slice(16, 21)} AM` : null;
  const displaySunset = currentWeather.sys?.sunset ?
    `${new Date(currentWeather.sys.sunset * 1000).toString().slice(16, 21)} PM` : null;

  return (
    <>
      <Text mt='4' fontSize='lg'>Current</Text>
      <TableContainer mt='4'>
        {
          weatherDetail ?
          (
            <Box p='2' bg='gray.300' rounded='md'>
              <Flex>
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherDetail?.icon}@2x.png`}
                  alt='weather icon'
                  boxSize='100px'
                  borderRadius='full'
                />
                <Spacer />
                <Box mr='4'>
                  <Text fontSize='xl' align='right'>{currentWeather.name || '-'}, {currentWeather.sys?.country || '-'}</Text>
                  <Text fontSize='md' align='right'>{`${currentWeather.main?.temp || '-'} \u2103`}</Text>
                  <Text fontSize='sm' align='right'>{weatherDetail?.main}</Text>
                  <Text fontSize='sm' align='right'>{weatherDetail?.description}</Text>
                </Box>
              </Flex>
            </Box>
          ) : false
        }
        <Table>
          <Tbody>
            <Tr>
              <Td>Feels Like</Td>
              <Td>{`${currentWeather.main?.feels_like || '-'} \u2103`}</Td>
            </Tr>
            <Tr>
              <Td>Humidity</Td>
              <Td>{currentWeather.main?.humidity || '-'} %</Td>
            </Tr>
            <Tr>
              <Td>Max. Temp.</Td>
              <Td>{`${currentWeather.main?.temp_max || '-'} \u2103`}</Td>
            </Tr>
            <Tr>
              <Td>Min. Temp.</Td>
              <Td>{`${currentWeather.main?.temp_min || '-'} \u2103`}</Td>
            </Tr>
            <Tr>
              <Td>Sunrise</Td>
              <Td>{displaySunrise || '-'}</Td>
            </Tr>
            <Tr>
              <Td>Sunset</Td>
              <Td>{displaySunset || '-'}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
