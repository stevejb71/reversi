import { createStore } from 'redux'
import { reversiApp } from './Reducers'

export const store = mkStore()

function mkStore() {
  if(typeof(window) !== 'undefined') {
    return createStore(
      reversiApp,
      // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  } else {
    return createStore(reversiApp)
  }
}
