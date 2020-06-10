import React from 'react'
import { expect, test } from '@jest/globals'
import { shallow } from 'enzyme'
import TemperatureTooColdNotification from '../TemperatureTooColdNotification'

test('it shows a message saying that the temperature of the container is too cold', () => {
  const notification = shallow(<TemperatureTooColdNotification id='foo' />)

  expect(notification).toHaveText('↘ Container foo is too cold')
})

test('it has the container-too-cold-notification class', () => {
  const notification = shallow(<TemperatureTooColdNotification id='foo' />)

  expect(notification).toHaveClassName('container-too-cold-notification')
})
