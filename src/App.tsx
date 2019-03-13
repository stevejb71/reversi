import * as React from 'react';
import './App.css';
import { BoardContainer } from './Board-container'
import { Player, invertPlayer, squareContentFor } from './MoveCalc';
import { BoardContent, calcNextMoves, Move, SquareContent } from './Model';
import { UpdateBoardAction } from './redux/Actions';
import { store } from './redux/Store';

export type AppProps = Readonly<{
  board: BoardContent,
  player: Player,
  updateBoard: (board: BoardContent, nextPlayer: Player) => UpdateBoardAction
}>

export function App({board, updateBoard, player}: AppProps) {
  const onClick = (move: Move) => {
    const {board: nextBoard, player: nextPlayer} = play(board.squares.slice(0), move, player)
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

function play(squares: SquareContent[], {index, indicesToFlip}: Move, player: Player): BoardAndPlayer {
  const playerSquare = squareContentFor(player)
  const nextPlayer = invertPlayer(player)
  
  squares[index] = playerSquare
  indicesToFlip.forEach(i => {squares[i] = playerSquare})
  
  const nextPlayerMoves = calcNextMoves(squares, nextPlayer)
  const nextBoard = {squares, nextMoves: nextPlayerMoves}
  return {board: nextBoard, player: nextPlayer}
}
