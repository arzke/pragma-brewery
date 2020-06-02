import { containerResolver } from './container'

export const resolvers = {
  Query: Object.assign(
    {},
    containerResolver
  )
}
