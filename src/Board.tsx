import * as React from 'react'
import { BoardContent, Move } from './Model'
import { Square } from './Square';

export type BoardProps = Readonly<{
  board: BoardContent,
  size: number,
  onClick: (move: Move) => void
}>

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

function mkRow({board, size, onClick}: BoardProps, row: number) {
  const index = row * size
  const rowArray = []
  for(let i = index; i < index + size; ++i) {
    const move = board.nextMoves.find(m => m.index === i)
    const onClickFn = move === undefined ? () => {} : () => onClick(move)
    rowArray.push(<Square key={`square-${i}`} content={board.squares[i]} hasMove={move !== undefined} onClick={onClickFn}/>)
  }
  return rowArray
}
 