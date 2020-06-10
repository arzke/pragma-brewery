import React from 'react'
import Container from './Container'

const Containers = ({ containers }) => {
  return (
    <div className='containers'>
      {containers.length > 0
        ? containers.map(({ id, content }) => (
          <Container key={`container-${id}`} id={id} content={content} />
        ))
        : (<span className='no-container'>There is no container in the list</span>)}
    </div>
  )
}

export default Containers
