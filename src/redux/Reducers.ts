import { initialState, State } from './State';
import { Action } from './Actions'

function isReversiAction(x: Action | object): x is Action {
  const type = (<Action>x).type  
  return type !== undefined && type.startsWith("@@reversi")
}

export function reversiApp(state: State = initialState, action: Action | object) {
  if(isReversiAction(action)) {
    switch(action.type) {
      case '@@reversi/UPDATE_BOARD':   
        return {...state, board: action.board, currentPlayer: action.player}
    }
  }
  return state
}