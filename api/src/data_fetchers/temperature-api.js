import fetch from 'node-fetch'

export const getTemperature = async (containerId) => {
  try {
    const data = await fetch(`https://temperature-sensor-service.herokuapp.com/sensor/${containerId}`)
    const { temperature } = await data.json()

    return temperature
  } catch (error) {
    console.error('Error while fetching temperature from API', containerId, error)

    return null
  }
}
