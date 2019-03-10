import * as React from 'react'
import { Square } from './Square'
import { BoardContent } from './Model'
import { Player } from './MoveCalc';

interface BoardProps {
  board: BoardContent
  size: number,
  player: Player,
  onClick: (index: number) => void
}

export function Board(props: BoardProps) {
  return (
    <table><tbody><tr>{header()}</tr>{contents(props)}</tbody></table>
  )
}

function header() {
  const header = [<th key='blank'/>]
  for(const letter of 'abcdefgh') {
    header.push(<th key={letter}>{letter}</th>)
  }
  return header
}
  
function contents(props: BoardProps) {
  const contents = []
  for(let row = 0; row < props.size; row++) {
    contents.push(
      <tr key={row}>
        <td>{row}</td>{mkRow(props, row)}
      </tr>
    )
  }
  return contents
}

function mkRow(props: BoardProps, row: number) {
  const index = row * props.size
  const rowArray = []
  for(let i = index; i < index + props.size; ++i) {
    const onClick = () => props.onClick(i)
    rowArray.push(<Square key={`square-${i}`} content={props.board[i]} player={props.player} onClick={onClick}/>)
  }
  return rowArray
}
 