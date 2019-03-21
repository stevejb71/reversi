import { BoardContent } from '../Model'
import { Player } from '../MoveCalc';

// typed actions

export type UpdateBoardAction = Readonly<{
  type: '@@reversi/UPDATE_BOARD',
  board: BoardContent,
  player: Player
}>

export type Action = UpdateBoardAction

// action creators

export function updateBoard(board: BoardContent, nextPlayer: Player): UpdateBoardAction {
  return {
    type: '@@reversi/UPDATE_BOARD',
    board,
    player: nextPlayer
  }
}
