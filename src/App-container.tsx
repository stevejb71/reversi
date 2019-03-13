import { connect } from 'react-redux'
import { State } from './redux/State'
import { App, AppProps } from './App'
import { updateBoard } from './redux/Actions'

function mapStateToProps(state: State): Pick<AppProps, 'board' | 'currentPlayer'> {
  return {
    board: state.board,
    currentPlayer: state.currentPlayer
  }
}

const mapDispatchToProps: Pick<AppProps, 'updateBoard'> = { updateBoard }

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)