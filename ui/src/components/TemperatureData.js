import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getTemperature } from '../graphql/queries'

const TemperatureData = ({ containerId, children }) => {
  const { loading: isReadingSensor, error, data } = useQuery(getTemperature, {
    variables: {
      containerId
    },
    pollInterval: 10000
  })

  if (isReadingSensor) {
    return <span className='reading-sensor'>Reading temperature from sensor...</span>
  }

  if (error) {
    return <span className='sensor-down'>Temperature sensor seems to be down :(</span>
  }

  return <span className='current-temperature'>{children(data.temperature)}</span>
}

export default TemperatureData
