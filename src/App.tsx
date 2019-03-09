import * as React from 'react';
import './App.css';
import { BoardContainer } from './Board-container'
import { Player } from './MoveCalc';
import { Provider } from 'react-redux'
import { store } from './redux/Store'

export default function App() {
  return (
    <Provider store={store}>
      <BoardContainer size={8} player={Player.Black} onClick={() => {}}/>
    </Provider>
  );
}
