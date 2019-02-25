import * as React from 'react';
import './App.css';
import { Board } from './Board'
import { emptyBoard } from './Model'

class App extends React.Component {
  public render() {
    return (
      <Board content={emptyBoard}/>
    );
  }
}

export default App;
