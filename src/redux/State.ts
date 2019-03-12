import { BoardContent, emptyBoard } from '../Model'

export interface State {
  board: BoardContent
}

export const initialState: State = {
  board: emptyBoard
}