import React from 'react'
import NotificationsContext from '../../context/NotificationsContext'
import getNotifier from '../../helpers/notifications'

const temperatureNotificationFactory = (containerId, temperature, minTemperature, maxTemperature) => {
  if (temperature > maxTemperature) {
    return {
      type: 'CONTAINER_IS_TOO_HOT',
      id: containerId
    }
  }

  if (temperature < minTemperature) {
    return {
      type: 'CONTAINER_IS_TOO_COLD',
      id: containerId
    }
  }

  return null
}

const notifyOnTemperatureOutOfRange = (containerId, temperature, minTemperature, maxTemperature, notifier) => {
  return () => {
    if (temperature) {
      const notification = temperatureNotificationFactory(containerId, temperature, minTemperature, maxTemperature)

      if (notification) {
        notifier.notify(notification)
      } else {
        notifier.deleteNotifications(containerId)
      }
    }
  }
}

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
  const { notifications, setNotifications } = React.useContext(NotificationsContext)
  const notifier = getNotifier(notifications, setNotifications)

  React.useEffect(
    notifyOnTemperatureOutOfRange(containerId, temperature, minTemperature, maxTemperature, notifier),
    [temperature]
  )

  return <span className={getClassName(temperature, minTemperature, maxTemperature)}>{temperature}°C</span>
}

export default Temperature
