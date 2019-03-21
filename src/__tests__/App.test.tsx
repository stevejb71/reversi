import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from '../App-container';
import { store } from '../redux/Store';
import { Provider } from 'react-redux';
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { SquareContent } from '../Model';

// @ts-ignore
const findSquare = (cmp: any) => (index: number) => cmp.findWhere(x => x.key() === `square-${index}`)

describe('App component', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const cmp = <Provider store={store}><AppContainer/></Provider>
    ReactDOM.render(cmp, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('updates the the board according to the rules when a piece is played', () => {
    Enzyme.configure({ adapter: new Adapter() });
    const cmp = Enzyme.mount(<Provider store={store}><AppContainer/></Provider>)
    const squareAt = findSquare(cmp)

    const squareToPlay = squareAt(19)
    squareToPlay.simulate('click')
    cmp.update()

    const actualBlackSquares = []
    for(let i = 0; i < 64; ++i) {
      if(squareAt(i).props().content === SquareContent.Black) {
        actualBlackSquares.push(i)
      }
    }
    expect(actualBlackSquares).toEqual([19, 27, 28, 35])
  })
})
