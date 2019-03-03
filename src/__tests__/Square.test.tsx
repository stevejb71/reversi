import * as React from 'react'
import { Square } from '../Square'
import { SquareContent } from '../Model'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import 'jest-extended'
import { Player } from '../MoveCalc';

Enzyme.configure({ adapter: new Adapter() });

describe('Square component', () => {
  const mkComponent = (content: SquareContent, player: Player) => {
    return Enzyme.shallow(<Square content={content} player={player}/>)
  }

  const assertClassName = (expectedClassName: string, content: SquareContent, player: Player) => {
    const component = mkComponent(content, player)
    expect(component.hasClass(expectedClassName)).toBeTrue()
  }

  it('has class name empty if content is empty', () => {
    assertClassName('empty', SquareContent.Empty, Player.Black)
  })

  it('has class name black if content is Black', () => {
    assertClassName('black', SquareContent.Black, Player.Black)
  })

  it('has class name white if content is White', () => {
    assertClassName('white', SquareContent.White, Player.Black)
  })

  it('has class name playable if content is WhiteCanPlay and player is White', () => {
    assertClassName('playable', SquareContent.WhiteCanPlay, Player.White)
  })

  it('does not have class name playable if content is WhiteCanPlay and player is Black', () => {
    expect(mkComponent(SquareContent.WhiteCanPlay, Player.Black).hasClass('playable')).toBeFalse()
  })

  it('has class name playable if content is BlackCanPlay and player is Black', () => {
    assertClassName('playable', SquareContent.BlackCanPlay, Player.Black)
  })

  it('does not have class name playable if content is BlackCanPlay and player is White', () => {
    expect(mkComponent(SquareContent.BlackCanPlay, Player.White).hasClass('playable')).toBeFalse()
  })
})