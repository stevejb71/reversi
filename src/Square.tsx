import { SquareContent } from './Model'
import * as React from 'react'
import { Player } from './MoveCalc';

export type SquareProps = Readonly<{
  content: SquareContent,
  player: Player,
  onClick: () => void,
}>

export function Square({content, player, onClick}: SquareProps) {
  return (
    <td className={`cell ${classNameFromContent(content, player)}`} onClick={onClick}>
      <span className='disc'/>
    </td>
  )
}

const classNameFromContent = (content: SquareContent, player: Player) => {    
  switch(content) {
    case SquareContent.Empty: return "empty"
    case SquareContent.Black: return "black"
    case SquareContent.White: return "white"
    case SquareContent.WhiteCanPlay: return player === Player.White ? "playable" : ""
    case SquareContent.BlackCanPlay: return player === Player.Black ? "playable" : ""
  }
}
