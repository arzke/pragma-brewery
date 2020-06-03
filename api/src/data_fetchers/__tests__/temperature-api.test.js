import { getTemperature } from '../temperature-apii'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import fetch from 'node-fetch'

jest.mock('node-fetch')

describe('getTemperature()', () => {
  test('it calls the temperature API with the container name', () => {
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

    test('it returns null', async () => {
      expect(await getTemperature('foo')).toBeNull()
    })

    test('it logs an error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error')
      await getTemperature('foo')

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error while fetching temperature from API', 'foo', error)
    })
  })

  describe('when the temperature API returns an invalid json', () => {
    beforeEach(() => {
      fetch.mockResolvedValue({
        json: null
      })
    })

    test('it returns null', async () => {
      expect(await getTemperature('foo')).toBeNull()
    })

    test('it logs an error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error')
      await getTemperature('foo')

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error while fetching temperature from API', 'foo', new TypeError('data.json is not a function'))
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
