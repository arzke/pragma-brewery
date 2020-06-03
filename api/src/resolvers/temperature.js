import { getTemperature } from '../data_fetchers/temperature-api'

export const temperatureResolver = {
  temperature: (_parent, { containerId }, _context, _info) => {
    return getTemperature(containerId)
  }
}
