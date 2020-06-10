import React from 'react'

const getClassName = (temperature, minTemperature, maxTemperature) => {
  if (temperature < minTemperature) {
    return 'too-cold'
  }

  if (temperature > maxTemperature) {
    return 'too-hot'
  }

  return 'in-range'
}

const Temperature = ({ containerId, temperature, minTemperature, maxTemperature }) => {
  return <span className={getClassName(temperature, minTemperature, maxTemperature)}>{temperature}°C</span>
}

export default Temperature
