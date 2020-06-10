import React from 'react'
import { expect, test } from '@jest/globals'
import { shallow } from 'enzyme'
import TemperatureTooHotNotification from '../TemperatureTooHotNotification'

test('it shows a message saying that the temperature of the container is too hot', () => {
  const notification = shallow(<TemperatureTooHotNotification id='foo' />)

  expect(notification).toHaveText('↗ Container foo is too hot')
})

test('it has the container-too-hot-notification class', () => {
  const notification = shallow(<TemperatureTooHotNotification id='foo' />)

  expect(notification).toHaveClassName('container-too-hot-notification')
})
