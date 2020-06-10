import React from 'react'
import { expect, test } from '@jest/globals'
import { shallow } from 'enzyme'
import Notification from '../Notification'
import SensorDownNotification from '../SensorDownNotification'
import TemperatureTooHotNotification from '../TemperatureTooHotNotification'
import TemperatureTooColdNotification from '../TemperatureTooColdNotification'

const createNotification = (type) => shallow(<Notification type={type} id='42'>{(notification) => <span>{notification}</span>}</Notification>)

test('when notification type is CONTAINER_IS_TOO_COLD it renders a TemperatureTooColdNotification', () => {
  const notification = createNotification('CONTAINER_IS_TOO_COLD')

  expect(notification).toContainReact(<TemperatureTooColdNotification id='42' />)
})

test('when notification type is CONTAINER_IS_TOO_HOT it renders a TemperatureTooHotNotification', () => {
  const notification = createNotification('CONTAINER_IS_TOO_HOT')

  expect(notification).toContainReact(<TemperatureTooHotNotification id='42' />)
})

test('when notification type is TEMPERATURE_SENSOR_IS_DOWN it renders a SensorDownNotification', () => {
  const notification = createNotification('TEMPERATURE_SENSOR_IS_DOWN')

  expect(notification).toContainReact(<SensorDownNotification id='42' />)
})

test('when notification type is unknown it returns null', () => {
  const notification = createNotification('UNKNOWN TYPE')

  expect(notification.html()).toBeNull()
})
