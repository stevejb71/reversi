import * as React from 'react'
import { Square } from './Square'
import { BoardContent } from './Model'
import { Player } from './MoveCalc';

export interface BoardProps {
  readonly board: BoardContent,
  readonly size: number,
  readonly player: Player,
  readonly onClick: (index: number) => void
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
        <td>{row+1}</td>{mkRow(props, row)}
      </tr>
    )
  }
  return contents
}

function mkRow({board, size, player, onClick}: BoardProps, row: number) {
  const index = row * size
  const rowArray = []
  for(let i = index; i < index + size; ++i) {
    const onClickFn = () => onClick(i)
    rowArray.push(<Square key={`square-${i}`} content={board.squares[i]} player={player} onClick={onClickFn}/>)
  }
  return rowArray
}
 