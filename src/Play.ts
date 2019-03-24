import { invertPlayer } from './MoveCalc';
import { BoardContent, SquareContent, Move, calcNextMoves } from './Model';
import { Player, squareContentFor } from './MoveCalc';

type BoardAndPlayer = Readonly<{
  board: BoardContent,
  player: Player
}>

export function play(squares: SquareContent[], player: Player, {index, indicesToFlip}: Move): BoardAndPlayer {
  const playerSquare = squareContentFor(player)
  const nextPlayer = invertPlayer(player)
  
  squares[index] = playerSquare
  indicesToFlip.forEach(i => {squares[i] = playerSquare})
  
  const nextPlayerMoves = calcNextMoves(squares, nextPlayer)
  const nextBoard = {squares, nextMoves: nextPlayerMoves}
  return {board: nextBoard, player: nextPlayer}
}

// function computerMovesNext(playerSettings: PlayerSettings, player: Player): Boolean {
//   switch(player) {
//     case Player.Black:
//       return playerSettings.black === PlayerType.Computer
//     case Player.White:
//       return playerSettings.white === PlayerType.Computer
//   }
// }