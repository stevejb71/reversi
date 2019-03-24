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
  return {squares, nextMoves: calcNextMoves(squares, Player.Black)}
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

export enum PlayerType {
  Human = 0, Computer = 1
}

export type PlayerSettings = Readonly<{
  black: PlayerType,
  white: PlayerType
}>

export const hashBoard = (board: BoardContent) => {
  let h = 0
  let i = 1
  for(const sq of board.squares) {
    h += sq.valueOf() * i
    i += 1
  }
  return h
}

