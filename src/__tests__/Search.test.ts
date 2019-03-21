import 'jest-extended'
import { alphaBeta, Tree, Node } from '../Search';
import * as sinon from 'sinon'

type TestTree = Tree<number>
type TestNode = Node<number>

function mkTree(board: number, score: number | undefined = undefined, children: TestNode[] | undefined = undefined): TestTree {
  return {node: {board, score}, children}
}
function mkNode(board: number, score: number | undefined = undefined): TestNode {
  return {board, score}
}

describe('Search', () => {
  it('if ply is 0, it sets the score in the given node', () => {
    const tree = mkTree(100)
    const scorer = sinon.stub()
    scorer.withArgs(100, "Black").returns(88)
    
    alphaBeta(tree, "Black", "White", 0, sinon.fake(), scorer)

    expect(tree.node.score).toEqual(88)
  })

  it('if ply is 1, it sets the children in the given node', () => {
    const tree = mkTree(100)
    const scorer = sinon.stub()
    const nextMoves = sinon.stub()
    const children = [50, 60]
    nextMoves.withArgs(100, "Black").returns(children)
    
    alphaBeta(tree, "Black", "White", 1, nextMoves, scorer)

    expect(tree.children).toEqual([mkNode(50), mkNode(60)])
  })

  it('if ply is 1, it scores the root to the max of the root node children', () => {
    const tree = mkTree(100)
    const scorer = sinon.stub()
    const nextMoves = sinon.stub()
    const children = [50, 60]
    nextMoves.withArgs(100, "Black").returns(children)
    scorer.withArgs(50, "Black").returns(500)
    scorer.withArgs(60, "Black").returns(600)
    
    alphaBeta(tree, "Black", "White", 1, nextMoves, scorer)

    expect(tree.node.score).toEqual(600)
  })
})