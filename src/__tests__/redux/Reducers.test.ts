import { State } from './../../redux/State';
import { SquareContent } from './../../Model';
import { UpdateBoardAction } from '../../redux/Actions'
import { reversiApp } from '../../redux/Reducers'
import 'jest-extended'
import { Player } from '../../MoveCalc';

describe('reversiApp reducer', () => {
  const state: State = {
    board: {
      squares: [],
      nextMoves: []
    },
    boardSize: 8,
    currentPlayer: Player.Black
  }

  it('if the action is a redux init action then return initialState', () => {
    const action = {type: '@@react/init'}

    const nextState = reversiApp(state, action)

    expect(nextState).toBe(state)
  })

  it('updates the state with the new board for update board action', () => {
    const board = {
      squares: [SquareContent.Black],
      nextMoves: []
    }
    const action: UpdateBoardAction = {
      type: "@@reversi/UPDATE_BOARD",
      board
    }

    const nextState = reversiApp(state, action)

    expect(nextState.board).toBe(board)
  })
})