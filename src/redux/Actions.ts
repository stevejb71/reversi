import { BoardContent } from '../Model'

// typed actions

export interface UpdateBoardAction {
  type: '@@reversi/UPDATE_BOARD',
  board: BoardContent
}

export type Action = UpdateBoardAction

// action creators

export function updateBoard(board: BoardContent): UpdateBoardAction {
  return {
    type: '@@reversi/UPDATE_BOARD',
    board
  }
}