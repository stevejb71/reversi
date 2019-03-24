import { Player, } from '../MoveCalc';
import { Move, BoardContent, } from './../Model';
import { play } from '../Play';

// typed actions

export type MoveAction = Readonly<{
  type: '@@reversi/MOVE',
  payload: {
    board: BoardContent,
    player: Player
  }
}>

export type Action = MoveAction

// action creators

export function mkMoveAction(board: BoardContent, player: Player, move: Move): MoveAction {
  return {
    type: '@@reversi/MOVE',
    payload: play(board.squares.slice(0), player, move)
  }
}

