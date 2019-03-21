import { SquareContent } from '../Model';
import { Player } from '../MoveCalc';
import { piecesCountEvaluator } from '../Evaluation';

describe('Pieces count evaluator', () => {
  it('returns the difference in pieces count between player and opponent', () => {
    const board = {
      squares: [SquareContent.Black, SquareContent.White, SquareContent.Empty, SquareContent.White, SquareContent.White],
      nextMoves: []
    }

    expect(piecesCountEvaluator(board, Player.Black)).toBe(-2)
    expect(piecesCountEvaluator(board, Player.White)).toBe(2)
  })
})