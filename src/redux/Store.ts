import { createStore } from 'redux'
import { reversiApp } from './Reducers'

export const store = createStore(reversiApp)