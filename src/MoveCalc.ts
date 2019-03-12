import { SquareContent, Move } from './Model'

export enum Player {
  White, Black
}

function invertPlayer(p: Player): Player {
  return p === Player.White ? Player.Black : Player.White
}

function squareContentFor(p: Player): SquareContent {
  return p === Player.White ? SquareContent.White : SquareContent.Black
}

function forEachDelta(
  index: number, 
  offset: (index: number, dx: number, dy: number) => number | undefined,
  f: (dx: number, dy: number) => void
  ): void {
  const callIfInBoard = (dx: number, dy: number) => {
    const i = offset(index, dx, dy)
    if(i !== undefined) {
      f(dx, dy)
    }
  }
  callIfInBoard(-1, -1)
  callIfInBoard(-1, 0)
  callIfInBoard(-1, 1)
  callIfInBoard(0, -1)
  callIfInBoard(0, 1)
  callIfInBoard(1, -1)
  callIfInBoard(1, 0)
  callIfInBoard(1, 1)
}

function offsetFn(boardSize: number) {
  function offset(index: number, dx: number, dy: number): number | undefined {
    const x = index % boardSize
    const y = index / boardSize
    return (x + dx < 0 || x + dx >= boardSize) || (y + dy < 0 || y + dy >= boardSize) 
       ? undefined
       : index + dx + boardSize * dy
  }
  return offset
}

function addAll<A>(s: Set<A>, x: Set<A>) {
  x.forEach(z => s.add(z))
}

function nextMoves(
  squares: SquareContent[],
  player: Player,
  offset: (index: number, dx: number, dy: number) => number | undefined
): Move[] {
  const moves = []
  const playerSquare = squareContentFor(player)
  const otherSquare = squareContentFor(invertPlayer(player))
  for(let index = 0; index < squares.length; ++index) {
    if(squares[index] !== SquareContent.Empty) {
      continue
    }
    const indicesToFlip = new Set<number>()
    forEachDelta(index, offset, (dx, dy) => {
      const indicesToFlipForDelta = new Set<number>()
      let nextIndex = offset(index, dx, dy)
      if(nextIndex === undefined || squares[nextIndex] !== otherSquare) {
        return
      }
      do {
        indicesToFlipForDelta.add(nextIndex)
        nextIndex = offset(nextIndex, dx, dy)
      } while(nextIndex !== undefined && squares[nextIndex] === otherSquare)
      if(nextIndex !== undefined && squares[nextIndex] === playerSquare) {
        addAll(indicesToFlip, indicesToFlipForDelta)
      }
    })
    if(indicesToFlip.size > 0) {
      moves.push({index, indicesToFlip})
    }
  }
  return moves
}

export type NextMovesFn = (squares: SquareContent[], player: Player) => Move[]

export function nextMovesFn(boardSize: number): NextMovesFn {
  const offset = offsetFn(boardSize)
  return (board, player) => nextMoves(board, player, offset)
}