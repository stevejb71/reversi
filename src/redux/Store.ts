import { createStore, applyMiddleware } from 'redux'
import { reversiApp } from './Reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = mkStore()

function mkStore() {
  return createStore(reversiApp, composeWithDevTools(applyMiddleware(thunk)))
}
