import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { shallow } from 'enzyme'
import ContainersData from '../ContainersData'
import { getContainers } from '../../graphql/queries'

jest.mock('@apollo/react-hooks')

test('it calls the useQuery hook with the container id and a poll interval', () => {
  useQuery.mockReturnValue({
    loading: true
  })

  shallow(<ContainersData />)

  expect(useQuery).toHaveBeenCalledWith(getContainers)
})

describe('when loading is true', () => {
  beforeEach(() => {
    useQuery.mockReturnValue({
      loading: true
    })
  })

  test('it displays a message saying the containers are being loaded', () => {
    const containersData = shallow(<ContainersData />)

    expect(containersData).toContainMatchingElement('.loading-containers')
    expect(containersData.find('.loading-containers')).toHaveText('Loading the containers')
  })
})

describe('when loading is false and error is not null', () => {
  beforeEach(() => {
    useQuery.mockReturnValue({
      loading: false,
      error: 'some error'
    })
  })

  test('it displays a message saying there was an error loading the containers', () => {
    const containersData = shallow(<ContainersData />)

    expect(containersData).toContainMatchingElement('.error-loading-containers')
    expect(containersData.find('.error-loading-containers')).toHaveText('Error while loading the containers')
  })
})

describe('when loading is false and error is null and a list of containers is returned in the data', () => {
  beforeEach(() => {
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: {
        containers: 'foo'
      }
    })
  })

  test('it renders the Containers with the containers in the data', () => {
    const containersData = shallow(<ContainersData />)

    expect(containersData).toContainMatchingElement('.containers')
    expect(containersData.find('Containers')).toHaveProp('containers', 'foo')
  })
})
