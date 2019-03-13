import * as React from 'react'
import { BoardContent } from './Model'
import { SquareContainer } from './square-container';

export type BoardProps = Readonly<{
  board: BoardContent,
  size: number,
  onClick: (index: number) => void
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
    const onClickFn = () => onClick(i)
    rowArray.push(<SquareContainer key={`square-${i}`} content={board.squares[i]} onClick={onClickFn}/>)
  }
  return rowArray
}
 