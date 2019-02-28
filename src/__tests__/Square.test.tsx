import * as React from 'react'
import { Square } from '../Square'
import { SquareContent } from '../Model'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import 'jest-extended'

Enzyme.configure({ adapter: new Adapter() });

describe('Square component', () => {
  const assertClassName = (expectedClassName: string, content: SquareContent) => {
    const component = Enzyme.shallow(<Square content={content}/>)
    
    expect(component.hasClass(expectedClassName)).toBeTrue()
  }

  it('has class name empty if content is empty', () => {
    assertClassName('empty', SquareContent.Empty)
  })

  it('has class name black if content is Black', () => {
    assertClassName('black', SquareContent.Black)
  })

  it('has class name white if content is White', () => {
    assertClassName('white', SquareContent.White)
  })
})