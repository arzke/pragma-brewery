import gql from 'graphql-tag'

export const getContainers = gql`
{
  containers {
    id
    content {
      name
      minTemperature
      maxTemperature
    }
  }
}
`

export const getTemperature = gql`
query getTemperature($containerId: ID!) {
  temperature(containerId: $containerId)
}
`
