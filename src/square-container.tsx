import { connect } from 'react-redux'
import { State } from './redux/State'
import { Square, SquareProps } from './Square';

function mapStateToProps(state: State): Pick<SquareProps, 'player'> {
  return {
    player: state.currentPlayer
  }
}

export const SquareContainer = connect(mapStateToProps)(Square)