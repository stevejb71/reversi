import * as React from 'react'
import { Board } from '../Board'
import { SquareContent, BoardContent } from '../Model'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import 'jest-extended'
import { Player } from '../MoveCalc';
import * as Sinon from 'sinon'

describe('Board component', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
  })

  it('calls onClick for the square which has been clicked', () => {
    const onClick = Sinon.stub<[number], void>()
    const board: BoardContent = {
      squares: [SquareContent.Black, SquareContent.White, SquareContent.Empty, SquareContent.Empty],
      nextMoves: []
    }
    const component = Enzyme.mount(<Board board={board} size={2} player={Player.Black} onClick={onClick}/>)

    const square = component.findWhere(x => x.key() === 'square-2')
    square.simulate('click')

    expect(onClick.called).toBeTrue()
  })
})