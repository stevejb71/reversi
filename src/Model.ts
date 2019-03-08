import { BoardContent } from './Model';
import { nextMovesFn, Player } from './MoveCalc';

function mkEmptyBoard(): any {
  const board = []
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
    board.push(squareContent(i))
  }
  setPlayableSquares(board)
  return board
}

function setPlayableSquares(board: BoardContent): void {
  const frontier = new Set()
  for(let i = 0; i < board.length; ++i) {
    if(board[i] === SquareContent.Empty) {
      frontier.add(i)
    }
  }
  const nextMoves = nextMovesFn(8)
  for(const move of nextMoves(board, frontier, Player.White)) {
    board[move.index] = SquareContent.WhiteCanPlay
  }
  for(const move of nextMoves(board, frontier, Player.Black)) {
    board[move.index] = SquareContent.BlackCanPlay
  }
}

export enum SquareContent {
  Black, White, Empty, WhiteCanPlay, BlackCanPlay
}

export type BoardContent = SquareContent[]

export const emptyBoard: BoardContent = mkEmptyBoard()

