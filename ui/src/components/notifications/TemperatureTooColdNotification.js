import React from 'react'

const TemperatureTooColdNotification = ({ id }) => {
  return <span className='notification container-too-cold-notification'>↘ Container {id} is too cold</span>
}

export default TemperatureTooColdNotification
