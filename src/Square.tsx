import { SquareContent } from './Model'
import * as React from 'react'
import { Player } from './MoveCalc';

interface SquareProps {
  content: SquareContent,
  player: Player
}

export function Square(props: SquareProps) {
  const { content, player } = props
  return (
    <td className={`cell ${classNameFromContent(content, player)}`}>
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
