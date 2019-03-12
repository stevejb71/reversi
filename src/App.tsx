import * as React from 'react';
import './App.css';
import { BoardContainer } from './Board-container'
import { Player } from './MoveCalc';
import { BoardContent, SquareContent, calcNextMoves } from './Model';
import { UpdateBoardAction } from './redux/Actions';
import { store } from './redux/Store';

interface AppProps {
  board: BoardContent,
  updateBoard: (board: BoardContent) => UpdateBoardAction
}

export default function App({board, updateBoard}: AppProps) {
  const onClick = (index: number) => store.dispatch(updateBoard(play(board, index)))
  return (
      <BoardContainer size={8} player={Player.Black} onClick={onClick}/>
  )
}

// TODO: TEST
function play(board: BoardContent, index: number): BoardContent {
  const squares = board.squares.slice(0)
  squares[index] = SquareContent.Black
  const move = board.nextMoves.find(m => m.index === index)
  if(move === undefined) {
    throw Error("Impossible: no index")
  }
  move.indicesToFlip.forEach(i => {squares[i] = SquareContent.Black})
  return {
    squares,
    nextMoves: calcNextMoves(squares, Player.Black)
  }
}
