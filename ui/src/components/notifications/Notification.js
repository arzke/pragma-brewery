import React from 'react'
import TemperatureTooColdNotification from './TemperatureTooColdNotification'
import TemperatureTooHotNotification from './TemperatureTooHotNotification'
import SensorDownNotification from './SensorDownNotification'

const notificationTypes = {
  CONTAINER_IS_TOO_COLD: TemperatureTooColdNotification,
  CONTAINER_IS_TOO_HOT: TemperatureTooHotNotification,
  TEMPERATURE_SENSOR_IS_DOWN: SensorDownNotification
}

const Notification = ({ type, id, children }) => {
  const NotificationType = notificationTypes[type]

  if (NotificationType) {
    return children(<NotificationType id={id} />)
  }

  return null
}

export default Notification
