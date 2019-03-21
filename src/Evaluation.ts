import { BoardContent } from './Model';
import { Player, squareContentFor, invertPlayer } from './MoveCalc';

// scores the board from the player's point of view.
type Evaluator = (board: BoardContent, player: Player) => number

export const piecesCountEvaluator: Evaluator = (board: BoardContent, player: Player) => {
  const count = (p: Player) => {
    const square = squareContentFor(p)
    return board.squares.filter(s => s === square).length
  }
  return count(player) - count(invertPlayer(player))
}