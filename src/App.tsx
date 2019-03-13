import * as React from 'react';
import './App.css';
import { BoardContainer } from './Board-container'
import { Player, invertPlayer, squareContentFor } from './MoveCalc';
import { BoardContent, calcNextMoves, Move, SquareContent } from './Model';
import { UpdateBoardAction } from './redux/Actions';
import { store } from './redux/Store';

export type AppProps = Readonly<{
  board: BoardContent,
  currentPlayer: Player,
  updateBoard: (board: BoardContent, nextPlayer: Player) => UpdateBoardAction
}>

export function App({board, updateBoard, currentPlayer}: AppProps) {
  const onClick = (move: Move) => {
    const {board: nextBoard, player: nextPlayer} = play(board.squares.slice(0), move, currentPlayer)
    store.dispatch(updateBoard(nextBoard, nextPlayer))
  }
  return (
      <BoardContainer onClick={onClick}/>
  )
}

type BoardAndPlayer = Readonly<{
  board: BoardContent,
  player: Player
}>

function play(squares: SquareContent[], {index, indicesToFlip}: Move, currentPlayer: Player): BoardAndPlayer {
  const playerSquare = squareContentFor(currentPlayer)
  const nextPlayer = invertPlayer(currentPlayer)
  
  squares[index] = playerSquare
  indicesToFlip.forEach(i => {squares[i] = playerSquare})
  
  const nextPlayerMoves = calcNextMoves(squares, nextPlayer)
  const nextBoard = {squares, nextMoves: nextPlayerMoves}
  return {board: nextBoard, player: nextPlayer}
}
