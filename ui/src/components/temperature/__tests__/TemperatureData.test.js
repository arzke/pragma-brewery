import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { shallow } from 'enzyme'
import TemperatureData from '../TemperatureData'
import { getTemperature } from '../../../graphql/queries'
import getNotifier from '../../../helpers/notifications'

jest.mock('@apollo/react-hooks')
jest.mock('../../../helpers/notifications')

let notifications
let setNotificationsMock

let notifyMock
let deleteNotificationsMock

beforeEach(() => {
  notifications = []
  setNotificationsMock = jest.fn()

  const useContextMock = jest.fn(() => ({
    notifications,
    setNotifications: setNotificationsMock
  }))

  jest.spyOn(React, 'useContext')
    .mockImplementation(useContextMock)

  jest.spyOn(React, 'useEffect')
    .mockImplementation(f => f())
})

beforeEach(() => {
  notifyMock = jest.fn()
  deleteNotificationsMock = jest.fn()

  getNotifier.mockReturnValue({
    notify: notifyMock,
    deleteNotifications: deleteNotificationsMock
  })
})

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

test('it calls the notifier with the notifications from the context', () => {
  shallow(<TemperatureData containerId='foo' />)
  expect(getNotifier).toHaveBeenCalledWith(notifications, setNotificationsMock)
})

describe('when loading is true', () => {
  let temperatureData

  beforeEach(() => {
    useQuery.mockReturnValue({
      loading: true
    })

    temperatureData = shallow(<TemperatureData containerId='foo' />)
  })

  test('it displays a message saying the temperature is being read', () => {
    expect(temperatureData).toContainMatchingElement('.reading-sensor')
    expect(temperatureData.find('.reading-sensor')).toHaveText('Reading temperature from sensor...')
  })

  test('it does not call the notify function', () => {
    shallow(<TemperatureData containerId='foo' />)

    expect(notifyMock).not.toHaveBeenCalled()
  })

  test('it calls the deleteNotifications function', () => {
    shallow(<TemperatureData containerId='foo' />)

    expect(deleteNotificationsMock).toHaveBeenCalledWith('foo')
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
    expect(temperatureData.find('.sensor-down')).toHaveText('⚠ Temperature sensor is not responding')
  })

  test('it calls the notify function with a sensor down notification', () => {
    shallow(<TemperatureData containerId='foo' />)

    expect(notifyMock).toHaveBeenCalledWith({
      type: 'TEMPERATURE_SENSOR_IS_DOWN',
      id: 'foo'
    })
  })

  test('it does not call the deleteNotifications function', () => {
    shallow(<TemperatureData containerId='foo' />)

    expect(deleteNotificationsMock).not.toHaveBeenCalled()
  })
})

describe('when loading is false and error is null and temperature is returned in the data', () => {
  let temperatureData

  beforeEach(() => {
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: {
        temperature: 6.0
      }
    })

    temperatureData = shallow((
      <TemperatureData containerId='foo'>
        {(temperature) => <div className='temperature'>{temperature}°C</div>}
      </TemperatureData>
    ))
  })

  test('it passes the temperature to the children', () => {
    expect(temperatureData).toContainMatchingElement('.current-temperature')
    expect(temperatureData.find('.temperature')).toHaveText('6°C')
  })

  test('it does not call the notify function', () => {
    expect(notifyMock).not.toHaveBeenCalled()
  })

  test('it calls the deleteNotifications function', () => {
    expect(deleteNotificationsMock).toHaveBeenCalledWith('foo')
  })
})
