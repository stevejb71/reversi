import * as React from 'react';
import './App.css';
import { BoardContainer } from './Board-container'
import { Player, invertPlayer, squareContentFor, playableSquareContentFor } from './MoveCalc';
import { BoardContent, calcNextMoves, SquareContent } from './Model';
import { UpdateBoardAction } from './redux/Actions';
import { store } from './redux/Store';

export interface AppProps {
  board: BoardContent,
  currentPlayer: Player,
  updateBoard: (board: BoardContent, nextPlayer: Player) => UpdateBoardAction
}

export function App({board, updateBoard, currentPlayer}: AppProps) {
  const onClick = (index: number) => {
    const {board: nextBoard, player: nextPlayer} = play(board, index, currentPlayer)
    store.dispatch(updateBoard(nextBoard, nextPlayer))
  }
  return (
      <BoardContainer onClick={onClick}/>
  )
}

interface BoardAndPlayer {
  board: BoardContent,
  player: Player
}

function play(board: BoardContent, index: number, currentPlayer: Player): BoardAndPlayer {
  const squares = board.squares.slice(0)
  board.nextMoves.forEach(move => {
    squares[move.index] = SquareContent.Empty
  })
  const playerSquare = squareContentFor(currentPlayer)
  const nextPlayer = invertPlayer(currentPlayer)
  squares[index] = playerSquare
  const move = board.nextMoves.find(m => m.index === index)
  if(move === undefined) {
    throw Error("Impossible: no index")
  }
  move.indicesToFlip.forEach(i => {squares[i] = playerSquare})
  const nextPlayerMoves = calcNextMoves(squares, nextPlayer)
  const playableSquare = playableSquareContentFor(nextPlayer)
  nextPlayerMoves.forEach(move => {
    squares[move.index] = playableSquare
  })
  const nextBoard = {
    squares,
    nextMoves: nextPlayerMoves
  }
  return {board: nextBoard, player: nextPlayer}
}
