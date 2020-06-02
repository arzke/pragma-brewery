import { beers } from './beers'

const containersToCreate = 21

const createContainers = (containersToCreate) => {
  return [...Array(containersToCreate)]
    .map((_value, index) => ({
      id: index,
      content: beers[beers.length * Math.random() | 0]
    }))
}

export const containers = createContainers(containersToCreate)
