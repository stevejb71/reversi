import { BoardContent } from './Model';
import { nextMovesFn, Player, NextMovesFn } from './MoveCalc';

export const calcNextMoves: NextMovesFn = nextMovesFn(8)

function mkEmptyBoard(): any {
  const squares = []
  const squareContent = (i: number) => {
    switch(i) {
      case 27:
      case 36:
        return SquareContent.White
      case 28:
      case 35:
        return SquareContent.Black
      default:
        return SquareContent.Empty
    }
  }
  for(let i = 0; i < 64; ++i) {
    squares.push(squareContent(i))
  }
  const nextBlackMoves = calcNextMoves(squares, Player.Black)
  return {
    squares,
    nextMoves: nextBlackMoves
  }
}

export enum SquareContent {
  Empty = 0, Black = 1, White = 2
}

export type Move = Readonly<{
  index: number,
  indicesToFlip: ReadonlySet<number>
}>

export type BoardContent = Readonly<{
  squares: ReadonlyArray<SquareContent>,
  nextMoves: ReadonlyArray<Move>
}>

export const emptyBoard: BoardContent = mkEmptyBoard()

