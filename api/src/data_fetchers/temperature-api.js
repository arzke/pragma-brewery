import fetch from 'node-fetch'
import * as apollo from 'apollo-server'

const { ApolloError } = apollo

export const getTemperature = async (containerId) => {
  try {
    const data = await fetch(`https://temperature-sensor-service.herokuapp.com/sensor/${containerId}`)
    const { temperature } = await data.json()

    return temperature
  } catch (error) {
    throw new ApolloError('Error while fetching temperature from API')
  }
}
