import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { shallow } from 'enzyme'
import TemperatureData from '../TemperatureData'
import { getTemperature } from '../../../graphql/queries'

jest.mock('@apollo/react-hooks')

test('it calls the useQuery hook with the container id and a poll interval', () => {
  useQuery.mockReturnValue({
    loading: true
  })

  shallow(<TemperatureData containerId='foo' />)

  expect(useQuery).toHaveBeenCalledWith(getTemperature, {
    variables: {
      containerId: 'foo'
    },
    pollInterval: 10000
  })
})

describe('when loading is true', () => {
  beforeEach(() => {
    useQuery.mockReturnValue({
      loading: true
    })
  })

  test('it displays a message saying the temperature is being read', () => {
    const temperatureData = shallow(<TemperatureData containerId='foo' />)

    expect(temperatureData).toContainMatchingElement('.reading-sensor')
    expect(temperatureData.find('.reading-sensor')).toHaveText('Reading temperature from sensor...')
  })
})

describe('when loading is false and error is not null', () => {
  beforeEach(() => {
    useQuery.mockReturnValue({
      loading: false,
      error: 'some error'
    })
  })

  test('it displays a message saying the temperature sensor is down', () => {
    const temperatureData = shallow(<TemperatureData containerId='foo' />)

    expect(temperatureData).toContainMatchingElement('.sensor-down')
    expect(temperatureData.find('.sensor-down')).toHaveText('Temperature sensor seems to be down :(')
  })
})

describe('when loading is false and error is null and temperature is returned in the data', () => {
  beforeEach(() => {
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: {
        temperature: 6.0
      }
    })
  })

  test('it passes the temperature to the children', () => {
    const temperatureData = shallow((
      <TemperatureData containerId='foo'>
        {(temperature) => <div className='temperature'>{temperature}°C</div>}
      </TemperatureData>
    ))

    expect(temperatureData).toContainMatchingElement('.current-temperature')
    expect(temperatureData.find('.temperature')).toHaveText('6°C')
  })
})
