import './startup.js'
import apollo from 'apollo-server'
import { resolvers } from './resolvers/index'
import { typeDefs } from './typeDefs'

const { ApolloServer } = apollo
const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
