import * as React from 'react'
import { Board } from '../Board'
import { SquareContent, BoardContent, Move } from '../Model'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import 'jest-extended'
import * as Sinon from 'sinon'

describe('Board component', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
  })

  it('calls onClick for the square which has been clicked', () => {
    const onClick = Sinon.stub<[Move], void>()
    const board: BoardContent = {
      squares: [SquareContent.Black, SquareContent.White, SquareContent.Empty, SquareContent.Empty],
      nextMoves: [{index: 2, indicesToFlip: new Set<number>()}]
    }
    const component = Enzyme.shallow(<Board board={board} size={2} onClick={onClick}/>)

    const square = component.findWhere(x => x.key() === 'square-2')
    square.simulate('click')

    expect(onClick.called).toBeTrue()
  })
})