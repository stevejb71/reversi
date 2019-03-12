import { createStore } from 'redux'
import { reversiApp } from './Reducers'

export const store = createStore(
  reversiApp,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())