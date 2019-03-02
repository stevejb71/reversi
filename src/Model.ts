function mkEmptyBoard(): any {
  const board = []
  const squareContent = (i: number) => {
    switch(i) {
      case 27:
      case 36:
        return SquareContent.White
      case 28:
      case 35:
        return SquareContent.Black
      default:
        return SquareContent.Empty
    }
  }
  for(let i = 0; i < 64; ++i) {
    board.push(squareContent(i))
  }
  return board
}

export enum SquareContent {
  Black, White, Empty
}

export type BoardContent = SquareContent[]

export const emptyBoard: BoardContent = mkEmptyBoard()

