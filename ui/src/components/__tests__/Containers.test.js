import React from 'react'
import { describe, expect, jest, test } from '@jest/globals'
import { shallow } from 'enzyme'
import Containers from '../Containers'

jest.mock('@apollo/react-hooks')

describe('when an empty containers list is passed to the component', () => {
  test('it displays a message saying there is no container', () => {
    const containers = shallow(<Containers containers={[]} />)

    expect(containers).toContainMatchingElement('.containers')
    expect(containers.find('.no-container')).toHaveText('There is no container in the list')
  })
})

describe('when a list of containers is passed to the component', () => {
  test('it displays the list of containers', () => {
    const containers = shallow(
      <Containers containers={[
        {
          id: '123',
          content: 'foo'
        },
        {
          id: '456',
          content: 'bar'
        }
      ]}
      />)

    expect(containers).toContainMatchingElement('.containers')
    expect(containers.find('.containers')).toContainMatchingElements(2, 'Container')

    expect(containers.find('Container').at(0)).toHaveProp({
      id: '123',
      content: 'foo'
    })
    expect(containers.find('Container').at(1)).toHaveProp({
      id: '456',
      content: 'bar'
    })
  })
})
