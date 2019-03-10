import * as React from 'react';
import './App.css';
import { BoardContainer } from './Board-container'
import { Player } from './MoveCalc';

export default function App() {
  return (
      <BoardContainer size={8} player={Player.Black} onClick={() => {}}/>
  )
}
