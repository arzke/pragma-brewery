import React from 'react'

const SensorDownNotification = ({ id }) => {
  return <span className='notification sensor-down-notification'>⚠ Temperature sensor is not responding on container {id}</span>
}

export default SensorDownNotification
