import React from 'react'

const Temperature = ({ temperature, minTemperature, maxTemperature }) => {
  if (temperature < minTemperature) {
    return <span className='too-cold'>{temperature}°C</span>
  }

  if (temperature > maxTemperature) {
    return <span className='too-hot'>{temperature}°C</span>
  }

  return <span className='in-range'>{temperature}°C</span>
}

export default Temperature
