import { getTemperature } from '../temperature-api'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import fetch from 'node-fetch'

jest.mock('node-fetch')

describe('getTemperature()', () => {
  test('it calls the temperature API with the container name', () => {
    fetch.mockReturnValue(new Promise(() => { }, () => { }))

    getTemperature('foo')
    expect(fetch).toHaveBeenCalledWith('https://temperature-sensor-service.herokuapp.com/sensor/foo')
  })

  describe('when the temperature API returns a rejected response', () => {
    let error

    beforeEach(() => {
      error = {
        statusCode: 404,
        error: 'Not Found',
        message: 'Not Found'
      }

      fetch.mockRejectedValue(error)
    })

    test('it throws an error', async () => {
      expect(async () => await getTemperature('foo')).rejects.toThrow(new Error('Error while fetching temperature from API'))
    })
  })

  describe('when the temperature API returns an invalid json', () => {
    beforeEach(() => {
      fetch.mockResolvedValue({
        json: null
      })
    })

    test('it throws an error', async () => {
      expect(async () => await getTemperature('foo')).rejects.toThrow(new Error('Error while fetching temperature from API'))
    })
  })

  describe('when the temperature API returns a json with the temperature', () => {
    test('it returns the temperature in the json', async () => {
      const response = {
        json: jest.fn().mockResolvedValue({
          temperature: 42.0
        })
      }
      fetch.mockResolvedValue(response)

      expect(await getTemperature('foo')).toEqual(42.0)
    })
  })
})
