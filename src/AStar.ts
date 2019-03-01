import Heap from 'typescript-collections/dist/lib/Heap'
import { ICompareFunction } from 'typescript-collections/dist/lib/util';

export function astarSearch<A>(
  start: A,
  compare: ICompareFunction<A>,
  next: (a: A) => Array<A>,
  finishSearch: (a: A) => boolean
): A | undefined {
  const openSet = new Heap<A>(compare)
  const closedSet = new Set<A>()
  openSet.add(start)
  while(!openSet.isEmpty()) {
    const current = openSet.removeRoot()
    if(current === undefined || finishSearch(current)) {
      return current
    }
    closedSet.add(current)
    const neighbours = next(current)
    for(const neighbour in neighbours) {
      if(closedSet.has(neighbour)) {
        continue
      }
      
    }
  }
  return start
}