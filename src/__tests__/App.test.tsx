import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from '../App-container';
import { store } from '../redux/Store';
import { Provider } from 'react-redux';

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const cmp = <Provider store={store}><AppContainer/></Provider>
    ReactDOM.render(cmp, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})
