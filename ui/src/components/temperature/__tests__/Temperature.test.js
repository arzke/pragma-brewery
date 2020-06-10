import React from 'react'
import { beforeEach, describe, expect, test, jest } from '@jest/globals'
import { shallow } from 'enzyme'
import Temperature from '../Temperature'
import getNotifier from '../../../helpers/notifications'

jest.mock('../../../helpers/notifications')

let temperature

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

test('it displays the temperature', () => {
  const temperature = shallow(<Temperature containerId='42' temperature={4} minTemperature={5} maxTemperature={7} />)

  expect(temperature.find('span')).toHaveText('4°C')
})

describe('when temperature is lower than minimum temperature', () => {
  beforeEach(() => {
    temperature = shallow(<Temperature containerId='42' temperature={4} minTemperature={5} maxTemperature={7} />)
  })

  test('it adds the "too-cold" class to the temperature', () => {
    expect(temperature).toContainMatchingElement('.too-cold')
  })

  test('it calls the notify function with a container too cold notification', () => {
    expect(notifyMock).toHaveBeenCalledWith({
      type: 'CONTAINER_IS_TOO_COLD',
      id: '42'
    })
  })
  test('it does not call the deleteNotifications function', () => {
    expect(deleteNotificationsMock).not.toHaveBeenCalled()
  })
})

describe('when temperature is higher than maximum temperature', () => {
  beforeEach(() => {
    temperature = shallow(<Temperature containerId='42' temperature={8} minTemperature={5} maxTemperature={7} />)
  })

  test('it adds the "too-hot" class to the temperature', () => {
    expect(temperature).toContainMatchingElement('.too-hot')
  })

  test('it calls the notify function with a container too hot notification', () => {
    expect(notifyMock).toHaveBeenCalledWith({
      type: 'CONTAINER_IS_TOO_HOT',
      id: '42'
    })
  })

  test('it does not call the deleteNotifications function', () => {
    expect(deleteNotificationsMock).not.toHaveBeenCalled()
  })
})

describe('when temperature is between the minimum and the maximum temperature', () => {
  beforeEach(() => {
    temperature = shallow(<Temperature containerId='42' temperature={6} minTemperature={5} maxTemperature={7} />)
  })

  test('it adds the "in-range" class to the temperature', () => {
    expect(temperature).toContainMatchingElement('.in-range')
  })

  test('it calls the notify function with a container too hot notification', () => {
    expect(notifyMock).not.toHaveBeenCalled()
  })

  test('it does not call the deleteNotifications function', () => {
    expect(deleteNotificationsMock).toHaveBeenCalledWith('42')
  })
})
