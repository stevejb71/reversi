export type Tree<Board> = {
  node: Node<Board>,
  children: Node<Board>[] | undefined
}

export type Score = number | "win" | "loss" | "draw"

export type Node<Board> = {
  board: Board,
  score: Score | undefined
}

export type NextMoves<Board, Player> = (board: Board, player: Player) => Board[]

export type Scorer<Board, Player> = (board: Board, player: Player) => Score

const scoreToNumber = (s: Score) => {
  switch(s) {
    case "win": return Number.POSITIVE_INFINITY
    case "loss": return Number.NEGATIVE_INFINITY
    case "draw": return 0
    default: return s
  }
}

function maxListBy<A>(xs: A[], f: (a: A) => number): number {
  let maxScore = Number.NEGATIVE_INFINITY
  for(let x of xs) {
    const score = f(x)
    if(score > maxScore) {
      maxScore = score
    }
  }
  return maxScore
}

export function alphaBeta<Board, Player>(
  tree: Tree<Board>, 
  player: Player, 
  opponent: Player, 
  ply: number, 
  nextMovesFn: NextMoves<Board, Player>,
  scorer: Scorer<Board, Player>): void {
  if(ply === 0) {
    tree.node.score = scorer(tree.node.board, player)
  } else {
    const children = nextMovesFn(tree.node.board, player).map(board => ({board, score: scorer(board, player)}))
    tree.children = children
    tree.node.score = maxListBy(children, x => scoreToNumber(x.score))
  }
}
