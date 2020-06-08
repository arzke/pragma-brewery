import React from 'react'
import { beforeEach, expect, test } from '@jest/globals'
import { shallow } from 'enzyme'
import Container from '../Container'

let container

beforeEach(() => {
  container = shallow(
    <Container
      id={123} content={{
        name: 'Pragma Ale',
        minTemperature: 4,
        maxTemperature: 9
      }}
    />
  )
})

test('it displays the id of the container in the title', () => {
  expect(container).toContainMatchingElement('h3')
  expect(container.find('h3')).toHaveText('Container #123')
})

test('it displays the temperature', () => {
  expect(container).toContainMatchingElement('TemperatureData')
  expect(container.find('TemperatureData')).toHaveProp('containerId', 123)
})

test('it displays the name of the content', () => {
  expect(container).toContainMatchingElement('.content')
  expect(container.find('.content')).toHaveText('Pragma Ale')
})

test('it displays the temperature range', () => {
  expect(container).toContainMatchingElement('.temperature-range')
  expect(container.find('.temperature-range')).toHaveText('4-9°C')
})
