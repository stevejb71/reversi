import * as React from 'react'
import { Square } from './Square'
import { BoardContent } from './Model'
import { Player } from './MoveCalc';

interface BoardProps {
  content: BoardContent,
  player: Player
}

export class Board extends React.Component<BoardProps> {
  render() {
    return (
      <table><tbody><tr>{this.header()}</tr>{this.contents()}</tbody></table>
    )
  }

  header() {
    const header = [<th key='blank'/>]
    for(let letter of 'abcdefgh') {
      header.push(<th key={letter}>{letter}</th>)
    }
    return header
  }
  
  contents() {
    const contents = []
    for(let row = 0; row < 8; row++) {
      contents.push(
        <tr key={row}>
          <td>{row}</td>{this.row(row)}
        </tr>
      )
    }
    return contents
  }

  row(row: number) {
    const index = row * 8
    const rowArray = []
    for(let i = index; i < index + 8; ++i) {
      rowArray.push(<Square key={i} content={this.props.content[i]} player={this.props.player}/>)
    }
    return rowArray
  }
}
 