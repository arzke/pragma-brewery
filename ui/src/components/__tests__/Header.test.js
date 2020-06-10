import React from 'react'
import { shallow } from 'enzyme'
import { beforeEach, expect, test, jest } from '@jest/globals'
import Header from '../Header'
import Notifications from '../notifications/Notifications'

beforeEach(() => {
  jest.spyOn(React, 'useContext')
    .mockImplementation(() => ({
      notifications: []
    }))
})

test('it displays Pragma Brewery in the navbar', () => {
  const header = shallow(<Header />)

  expect(header.find('.navbar-item')).toHaveText('Pragma Brewery')
})

test('it renders the Notifications component', () => {
  const header = shallow(<Header />)

  expect(header).toContainReact(<Notifications notifications={[]} />)
})
