import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from '../App-container';
import { store } from '../redux/Store';
import { Provider } from 'react-redux';
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { SquareContent } from '../Model';

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

  it('updates the square on the board according to the rules when a piece is played', () => {
    Enzyme.configure({ adapter: new Adapter() });
    const cmp = Enzyme.mount(<Provider store={store}><AppContainer/></Provider>)
    const squareToPlay = cmp.findWhere(x => x.key() === 'square-19')
    squareToPlay.simulate('click')
    cmp.update()

    const expectedBlackSquares = [19, 27, 28, 35]
    expectedBlackSquares.forEach(i => {
      const square = cmp.findWhere(x => x.key() === `square-${i}`)
      expect(square.props().content).toEqual(SquareContent.Black)
    })
  })
})
