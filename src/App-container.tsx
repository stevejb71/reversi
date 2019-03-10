import { connect } from 'react-redux'
import { State } from './redux/State'
import App from './App'
import { updateBoard } from './redux/Actions'

const mapStateToProps = (state: State) => {
  return {
    board: state.board
  }
}

const mapDispatchToProps = { updateBoard }

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)