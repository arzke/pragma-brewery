import React from 'react'
import TemperatureData from '../temperature/TemperatureData'
import Temperature from '../temperature/Temperature'

const Container = ({ id, content: { name, minTemperature, maxTemperature } }) => {
  return (
    <div className='container'>
      <h3>Container #{id}</h3>
      <TemperatureData containerId={id}>
        {(temperature) => (
          <Temperature temperature={temperature} minTemperature={minTemperature} maxTemperature={maxTemperature} />
        )}
      </TemperatureData>
      <span className='temperature-range'>{minTemperature}-{maxTemperature}°C</span>
      <span className='content'>{name}</span>
    </div>
  )
}

export default Container
