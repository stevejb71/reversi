import { SquareContent } from '../Model'
import 'jest-extended'
import { nextMovesFn, Player } from '../MoveCalc'

const B = SquareContent.Black
const W = SquareContent.White
const E = SquareContent.Empty

const indexOf = (x: number, y: number) => x + 5 * y

const nextMoves = nextMovesFn(5)

describe('Next moves calculation', () => {
  it('finds moves in all 8 directions', () => {
    const board = [
      W, E, W, E, W,
      E, B, B, B, E,
      W, B, E, B, W,
      E, B, B, B, W,
      W, E, W, E, W,
    ]
    const frontier = new Set([indexOf(2, 2)])
    
    const moves = nextMoves(board, frontier, Player.White)

    expect(moves).toEqual(new Set([indexOf(2, 2)]))
  })

  it('does not find a move on a line where the adjacent piece is empty', () => {
    const board = [
      E, E, E, E, E,
      E, E, E, E, E,
      E, E, E, E, E,
      E, E, E, E, E,
      E, E, E, E, E,
    ]
    const frontier = new Set([indexOf(2, 2)])
    
    const moves = nextMoves(board, frontier, Player.White)

    expect(moves).toEqual(new Set())
  })

  it('does not find a move on a line where the adjacent piece is the same colour as the player', () => {
    const board = [
      E, E, E, E, E,
      E, E, B, E, E,
      E, E, W, E, E,
      E, E, W, E, E,
      E, E, E, E, E,
    ]
    const frontier = new Set([indexOf(2, 0)])
    
    const moves = nextMoves(board, frontier, Player.Black)

    expect(moves).toEqual(new Set())
  })

  it('does not find a move on a line where the end of the board is reached without an empty square', () => {
    const board = [
      W, E, W, E, W,
      E, W, W, W, E,
      W, W, E, W, W,
      E, W, W, W, E,
      W, E, W, E, W,
    ]
    const frontier = new Set([indexOf(2, 2)])
    
    const moves = nextMoves(board, frontier, Player.Black)

    expect(moves).toEqual(new Set())
  })
})