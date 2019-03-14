import { BoardContent, Move, calcNextMoves } from './Model';
import { Player } from './MoveCalc';

export type ComputerPlayer = (player: Player, board: BoardContent) => Move

export const randomComputerPlayer: ComputerPlayer = (player: Player, board: BoardContent) => {
  const nextMoves = calcNextMoves(board.squares.slice(0), player)
  const choice = Math.floor(Math.random() * nextMoves.length)
  return nextMoves[choice]
}