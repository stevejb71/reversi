enum Piece {
  Black, White
}
type Empty = void
type Square = Piece | Empty

type GameBoard = [Square]