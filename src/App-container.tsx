import { connect } from 'react-redux'
import { State } from './redux/State'
import { App, AppProps } from './App'
import { updateBoard } from './redux/Actions'

function mapStateToProps(state: State): Pick<AppProps, 'board'> {
  return {
    board: state.board
  }
}

const mapDispatchToProps: Pick<AppProps, 'updateBoard'> = { updateBoard }

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)