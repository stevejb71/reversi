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
  const nextWhiteMoves = calcNextMoves(squares, Player.White)
  for(const {index} of nextWhiteMoves) {
    squares[index] = SquareContent.WhiteCanPlay
  }
  const nextBlackMoves = calcNextMoves(squares, Player.Black)
  for(const {index} of nextBlackMoves) {
    squares[index] = SquareContent.BlackCanPlay
  }
  return {
    squares,
    nextMoves: nextBlackMoves
  }
}

export enum SquareContent {
  Empty, Black, White, WhiteCanPlay, BlackCanPlay
}

export type Move = {
  index: number,
  indicesToFlip: Set<number>
}

export type BoardContent = {
  squares: SquareContent[],
  nextMoves: Move[]
}

export const emptyBoard: BoardContent = mkEmptyBoard()

