import { SquareContent } from './../../Model';
import { UpdateBoardAction } from '../../redux/Actions'
import { reversiApp } from '../../redux/Reducers'
import 'jest-extended'

describe('reversiApp reducer', () => {
  it('if the action is a redux init action then return initialState', () => {
    const action = {type: '@@react/init'}

    const nextState = reversiApp({board: []}, action)

    expect(nextState.board).toEqual([])
  })

  it('updates the state with the new board for update board action', () => {
    const board = [SquareContent.Black]
    const action: UpdateBoardAction = {
      type: "@@reversi/UPDATE_BOARD",
      board
    }

    const nextState = reversiApp({board: []}, action)

    expect(nextState.board).toBe(board)
  })
})