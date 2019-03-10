import * as React from 'react';
import './App.css';
import { BoardContainer } from './Board-container'
import { Player } from './MoveCalc';
import { BoardContent, SquareContent } from './Model';
import { UpdateBoardAction } from './redux/Actions';
import { store } from './redux/Store';

interface AppProps {
  board: BoardContent,
  updateBoard: (board: BoardContent) => UpdateBoardAction
}

export default function App(props: AppProps) {
  const onClick = doUpdate(props.board, props.updateBoard)
  return (
      <BoardContainer size={8} player={Player.Black} onClick={onClick}/>
  )
}

const doUpdate = (board: BoardContent, updateBoard: (board: BoardContent) => UpdateBoardAction) => (index: number) => {
  const boardCopy = board.slice(0)
  boardCopy[index] = SquareContent.Black
  store.dispatch(updateBoard(boardCopy))
}
