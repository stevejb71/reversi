import * as React from 'react'
import { Square } from '../Square'
import { SquareContent } from '../Model'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import 'jest-extended'
import * as Sinon from 'sinon'

Enzyme.configure({ adapter: new Adapter() });

describe('Square component', () => {
  const mkComponent = (content: SquareContent, hasMove: Boolean, onClick = () => {}) => {
    return Enzyme.shallow(<Square content={content} hasMove={hasMove} onClick={onClick}/>)
  }

  const assertClassName = (expectedClassName: string, content: SquareContent, hasMove: Boolean) => {
    const component = mkComponent(content, hasMove)
    expect(component.hasClass(expectedClassName)).toBeTrue()
  }

  it('has class name empty if content is empty', () => {
    assertClassName('empty', SquareContent.Empty, false)
  })

  it('has class name black if content is Black', () => {
    assertClassName('black', SquareContent.Black, true)
  })

  it('has class name white if content is White', () => {
    assertClassName('white', SquareContent.White, true)
  })

  it('has class name playable if hasMove', () => {
    expect(mkComponent(SquareContent.Empty, true).hasClass('playable')).toBeTrue()
  })

  it('does not have class name playable if not hasMove', () => {
    expect(mkComponent(SquareContent.Empty, false).hasClass('playable')).toBeFalse()
  })

  it('calls on click when clicked', () => {
    const onClick = Sinon.stub<[], void>()
    const component = mkComponent(SquareContent.Black, true, onClick)

    component.simulate('click')

    expect(onClick.called).toBeTrue()
  })
})