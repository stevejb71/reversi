import { astarSearch } from '../AStar'
import 'jest-extended'

describe('AStar search', () => {
  const compare = (a1: string, a2: string) => a1.length - a2.length

  it('returns start node when it is the only node', () => {
    const next = (_: string) => new Array<string>(0)

    expect(astarSearch("START", compare, next)).toEqual("START")
  })

  it('returns higher node of two when it is the start', () => {
    const next = (x: string) => x === "START" ? new Array("END") : new Array()

    expect(astarSearch("START", compare, next)).toEqual("START")
  })

  it('returns higher node of two when it is not the start', () => {
    const next = (x: string) => x === "START" ? new Array("BIGGER") : new Array()

    expect(astarSearch("START", compare, next)).toEqual("BIGGER")
  })
})