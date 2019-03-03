import * as React from 'react';
import './App.css';
import { Board } from './Board'
import { emptyBoard } from './Model'
import { Player } from './MoveCalc';

class App extends React.Component {
  public render() {
    return (
      <Board content={emptyBoard} size={8} player={Player.Black} onClick={() => {}}/>
    );
  }
}

export default App;
