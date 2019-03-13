import { PlayerSettings, PlayerType } from './../Model';
import { Player } from './../MoveCalc';
import { BoardContent, emptyBoard } from '../Model'

export type State = Readonly<{
  board: BoardContent,
  boardSize: number,
  player: Player,
  playerSettings: PlayerSettings
}>

export const initialState: State = {
  board: emptyBoard,
  boardSize: 8,
  player: Player.Black,
  playerSettings: {
    black: PlayerType.Human,
    white: PlayerType.Computer
  }
}