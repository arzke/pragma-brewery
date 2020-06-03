import { containerResolver } from './container'
import { temperatureResolver } from './temperature'

export const resolvers = {
  Query: Object.assign(
    {},
    containerResolver,
    temperatureResolver
  )
}
