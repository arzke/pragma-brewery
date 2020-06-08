import React from 'react'
import { describe, expect, test } from '@jest/globals'
import { shallow } from 'enzyme'
import Temperature from '../Temperature'

test('it displays the temperature', () => {
  const temperature = shallow(<Temperature temperature={4} minTemperature={5} maxTemperature={7} />)

  expect(temperature.find('span')).toHaveText('4°C')
})

describe('when temperature is lower than minimum temperature', () => {
  test('it adds the "too-cold" class to the temperature', () => {
    const temperature = shallow(<Temperature temperature={4} minTemperature={5} maxTemperature={7} />)

    expect(temperature).toContainMatchingElement('.too-cold')
  })
})

describe('when temperature is higher than maximum temperature', () => {
  test('it adds the "too-hot" class to the temperature', () => {
    const temperature = shallow(<Temperature temperature={8} minTemperature={5} maxTemperature={7} />)

    expect(temperature).toContainMatchingElement('.too-hot')
  })
})

describe('when temperature is between the minimum and the maximum temperatures', () => {
  test('it adds the "in-range" class to the temperature', () => {
    const temperature = shallow(<Temperature temperature={6} minTemperature={5} maxTemperature={7} />)

    expect(temperature).toContainMatchingElement('.in-range')
  })
})
