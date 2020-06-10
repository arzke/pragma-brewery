import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getContainers } from '../../graphql/queries'
import Containers from './Containers'

const ContainersData = () => {
  const { loading, error, data } = useQuery(getContainers)

  if (loading) {
    return (<span className='loading-containers'>Loading the containers</span>)
  }

  if (error) {
    return (<span className='error-loading-containers'>Error while loading the containers</span>)
  }

  return (
    <div className='containers'>
      <Containers containers={data.containers} />
    </div>
  )
}

export default ContainersData
