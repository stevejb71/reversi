import * as React from 'react';
import './App.css';
import { BoardContainer } from './Board-container'
import { Player, invertPlayer, squareContentFor } from './MoveCalc';
import { BoardContent, calcNextMoves, Move, SquareContent, PlayerSettings, PlayerType } from './Model';
import { UpdateBoardAction } from './redux/Actions';
import { store } from './redux/Store';
import { ComputerPlayer } from './ComputerPlayer';

export type AppProps = Readonly<{
  board: BoardContent,
  player: Player,
  playerSettings: PlayerSettings,
  computerPlayer: ComputerPlayer,
  updateBoard: (board: BoardContent, nextPlayer: Player) => UpdateBoardAction
}>

export function App({board, updateBoard, playerSettings, computerPlayer, player}: AppProps) {
  if(computerMovesNext(playerSettings, player)) {
    const move = computerPlayer(player, board)
    const {board: nextBoard, player: nextPlayer} = play(board.squares.slice(0), move, player)
    store.dispatch(updateBoard(nextBoard, nextPlayer))
    return <BoardContainer onClick={(_: Move) => {}}/>
  } else {
    const onClick = (move: Move) => {
      const {board: nextBoard, player: nextPlayer} = play(board.squares.slice(0), move, player)
      store.dispatch(updateBoard(nextBoard, nextPlayer))
    }
    return <BoardContainer onClick={onClick}/>
  }
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

function computerMovesNext(playerSettings: PlayerSettings, player: Player): Boolean {
  switch(player) {
    case Player.Black:
      return playerSettings.black === PlayerType.Computer
    case Player.White:
      return playerSettings.white === PlayerType.Computer
  }
}