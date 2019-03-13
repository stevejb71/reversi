import { Player } from './../MoveCalc';
import { BoardContent, emptyBoard } from '../Model'

export interface State {
  board: BoardContent,
  boardSize: number,
  currentPlayer: Player
}

export const initialState: State = {
  board: emptyBoard,
  boardSize: 8,
  currentPlayer: Player.Black
}