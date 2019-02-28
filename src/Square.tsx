import { SquareContent } from './Model'
import * as React from 'react'

interface SquareProps {
  content: SquareContent
}

export function Square(props: SquareProps) {
  return (
    <td className={`cell ${classNameFromContent(props.content)}`}>
      <span className='disc'/>
    </td>
  )
}

const classNameFromContent = (content: SquareContent) => {    
  switch(content) {
    case SquareContent.Empty: return "empty"
    case SquareContent.Black: return "black"
    case SquareContent.White: return "white"
  }
}
