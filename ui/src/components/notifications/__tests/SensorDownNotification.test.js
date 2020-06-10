import React from 'react'
import { expect, test } from '@jest/globals'
import { shallow } from 'enzyme'
import SensorDownNotification from '../SensorDownNotification'

test('it shows a message saying that the temperature sensor is not responding', () => {
  const notification = shallow(<SensorDownNotification id='foo' />)

  expect(notification).toHaveText('⚠ Temperature sensor is not responding on container foo')
})

test('it has the sensor-down-notification class', () => {
  const notification = shallow(<SensorDownNotification id='foo' />)

  expect(notification).toHaveClassName('sensor-down-notification')
})
