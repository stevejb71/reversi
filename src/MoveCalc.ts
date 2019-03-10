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

function frontierForBoard(
  board: BoardContent,
  offset: (index: number, dx: number, dy: number) => number | undefined)
  : Set<number> {
  const frontier = new Set<number>()
  board.forEach((value, index) => {
    if(value === SquareContent.Empty) {
      forEachDelta(index, offset, (dx, dy) => {
        const neighbourIndex = offset(index, dx, dy)
        if(neighbourIndex !== undefined && board[neighbourIndex] !== SquareContent.Empty) {
          frontier.add(index)
        }
      })
    }
  })
  return frontier
}


function* nextMoves(
  board: BoardContent,
  frontier: Set<number>,
  player: Player,
  offset: (index: number, dx: number, dy: number) => number | undefined
): IterableIterator<{index: number, indicesToFlip: Set<number>}> {
  const playerSquare = squareContentFor(player)
  const otherSquare = squareContentFor(invertPlayer(player))
  for(const index of frontier.values()) {
    const indicesToFlip = new Set<number>()
    forEachDelta(index, offset, (dx, dy) => {
      const indicesToFlipForDelta = new Set<number>()
      let nextIndex = offset(index, dx, dy)
      if(nextIndex === undefined || board[nextIndex] !== otherSquare) {
        return
      }
      do {
        indicesToFlipForDelta.add(nextIndex)
        nextIndex = offset(nextIndex, dx, dy)
      } while(nextIndex !== undefined && board[nextIndex] === otherSquare)
      if(nextIndex !== undefined && board[nextIndex] === playerSquare) {
        addAll(indicesToFlip, indicesToFlipForDelta)
      }
    })
    if(indicesToFlip.size > 0) {
      yield {index, indicesToFlip}
    }
  }
}

export type NextMovesFn = (board: BoardContent, frontier: Set<number>, player: Player) => IterableIterator<{index: number, indicesToFlip: Set<number>}>

export function nextMovesFn(boardSize: number): NextMovesFn {
  const offset = offsetFn(boardSize)
  return (board, frontier, player) => nextMoves(board, frontier, player, offset)
}

export type FrontierForBoardFn = (board: BoardContent) => Set<number>

export function frontierForBoardFn(boardSize: number): FrontierForBoardFn {
  const offset = offsetFn(boardSize)
  return board => frontierForBoard(board, offset)
}