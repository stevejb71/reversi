import { State } from './../../redux/State';
import { SquareContent, PlayerType } from './../../Model';
import { UpdateBoardAction } from '../../redux/Actions'
import { reversiApp } from '../../redux/Reducers'
import 'jest-extended'
import { Player } from '../../MoveCalc';
import { randomComputerPlayer } from '../../ComputerPlayer';

describe('reversiApp reducer', () => {
  const state: State = {
    board: {
      squares: [],
      nextMoves: []
    },
    boardSize: 8,
    player: Player.Black,
    playerSettings: {
      black: PlayerType.Human,
      white: PlayerType.Computer  
    },
    computerPlayer: randomComputerPlayer
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
      board,
      player: Player.White
    }

    const nextState = reversiApp(state, action)

    expect(nextState.board).toBe(board)
    expect(nextState.player).toBe(Player.White)
  })
})