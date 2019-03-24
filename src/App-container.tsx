import { connect } from 'react-redux'
import { State } from './redux/State'
import { App, AppProps } from './App'
import { mkMoveAction } from './redux/Actions'

function mapStateToProps(state: State): Pick<AppProps, 'board' | 'player'> {
  return state
}

const mapDispatchToProps: Pick<AppProps, 'mkMoveAction'> = { mkMoveAction }

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)