import { initialState, State } from './State';
import { Action } from './Actions'

function isReversiAction(x: Action | object): x is Action {
  const type = (<Action>x).type  
  return type !== undefined && type.startsWith("@@reversi")
}

export function reversiApp(state: State = initialState, action: Action | object): State {
  if(isReversiAction(action)) {
    switch(action.type) {
      case '@@reversi/MOVE':   
        return {...state, ...action.payload}
    }
  }
  return state
}