import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getTemperature } from '../../graphql/queries'
import getNotifier from '../../helpers/notifications'
import NotificationsContext from '../../context/NotificationsContext'

const notifyOnSensorError = (containerId, error, notifier) => {
  return () => {
    if (error) {
      notifier.notify({
        type: 'TEMPERATURE_SENSOR_IS_DOWN',
        id: containerId
      })
    } else {
      notifier.deleteNotifications(containerId)
    }
  }
}

const TemperatureData = ({ containerId, children }) => {
  const { loading: isReadingSensor, error, data } = useQuery(getTemperature, {
    variables: {
      containerId
    },
    pollInterval: 10000
  })

  const { notifications, setNotifications } = React.useContext(NotificationsContext)
  const notifier = getNotifier(notifications, setNotifications)

  React.useEffect(
    notifyOnSensorError(containerId, error, notifier),
    [error]
  )

  if (isReadingSensor) {
    return <span className='reading-sensor'>Reading temperature from sensor...</span>
  }

  if (error) {
    return <span className='sensor-down'>⚠ Temperature sensor is not responding</span>
  }

  return <span className='current-temperature'>{children(data.temperature)}</span>
}

export default TemperatureData
