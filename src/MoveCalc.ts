import { BoardContent, SquareContent } from './Model'

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
  const boardSizeSq = boardSize * boardSize
  function offset(index: number, dx: number, dy: number): number | undefined {
    const offset = index + dx + boardSize * dy
    return (offset < 0 || offset >= boardSizeSq) ? undefined : offset
  }
  return offset
}

function nextMoves(
  board: BoardContent,
  frontier: Set<number>,
  player: Player,
  offset: (index: number, dx: number, dy: number) => number | undefined 
): Set<number> {
  const nextMoves = new Set<number>()
  const playerSquare = squareContentFor(player)
  const otherSquare = squareContentFor(invertPlayer(player))
  frontier.forEach(index => {
    forEachDelta(index, offset, (dx, dy) => {
      let nextIndex = offset(index, dx, dy)
      if(nextIndex === undefined || board[nextIndex] !== otherSquare) {
        return
      }
      do {
        nextIndex = offset(nextIndex, dx, dy)
      } while(nextIndex !== undefined && board[nextIndex] === otherSquare)
      if(nextIndex !== undefined && board[nextIndex] === playerSquare) {
        nextMoves.add(index)
      }
    })
  })
  return nextMoves
}

export type NextMovesFn = (board: BoardContent, frontier: Set<number>, player: Player) => Set<number>

export function nextMovesFn(boardSize: number): NextMovesFn {
  const offset = offsetFn(boardSize)
  return (board, frontier, player) => nextMoves(board, frontier, player, offset)
}