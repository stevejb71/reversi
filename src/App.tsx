import * as React from 'react';
import './App.css';
import { BoardContainer } from './Board-container'
import { Player } from './MoveCalc';
import { BoardContent, Move } from './Model';
import { MoveAction } from './redux/Actions';
import { store } from './redux/Store';
import { typedWorker } from './ComputerPlayerWebWorker';

export type AppProps = Readonly<{
  board: BoardContent,
  player: Player,
  mkMoveAction: (board: BoardContent, player: Player, move: Move) => MoveAction
}>

export function App({board, player, mkMoveAction}: AppProps) {
  const onClick = (move: Move) => {
    typedWorker.postMessage({ x: 5, y: 5 })
    store.dispatch(mkMoveAction(board, player, move))
  }
  return <BoardContainer onClick={onClick}/>
}