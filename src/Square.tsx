import { SquareContent } from './Model'
import * as React from 'react'

export type SquareProps = Readonly<{
  content: SquareContent,
  hasMove: Boolean,
  onClick: () => void,
}>

export function Square({content, hasMove, onClick}: SquareProps) {
  return (
    <td className={`cell ${classNameFromContent(content, hasMove)}`} onClick={onClick}>
      <span className='disc'/>
    </td>
  )
}

const classNameFromContent = (content: SquareContent, hasMove: Boolean) => {    
  switch(content) {
    case SquareContent.Empty: return (hasMove ? "empty playable" : "empty")
    case SquareContent.Black: return "black"
    case SquareContent.White: return "white"
  }
}
