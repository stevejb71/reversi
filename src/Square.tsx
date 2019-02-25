import { SquareContent } from './Model'
import * as React from 'react'

interface SquareProps {
  content: SquareContent
}

export class Square extends React.Component<SquareProps> {
  render() {
    return (
      <td className={`cell ${Square.classNameFromContent(this.props.content)}`}>
        <span className='disc'/>
      </td>
    )
  }

  static classNameFromContent(content: SquareContent): string {    
    switch(content) {
      case SquareContent.Empty: return "empty"
      case SquareContent.Black: return "black"
      case SquareContent.White: return "white"
    }
  }
}