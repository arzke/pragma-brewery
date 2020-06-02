import apollo from 'apollo-server'
const { gql } = apollo

export const typeDefs = gql`
type Beer {
  name: String
  minTemperature: Float
  maxTemperature: Float
}

type Container {
  id: ID
  content: Beer
}

type Query {
  containers: [Container]
}
`
