import { connect } from 'react-redux'
import { State } from './redux/State'
import { Board } from './Board'

const mapStateToProps = (state: State) => {
  return {
    board: state.board
  }
}

export const BoardContainer = connect(mapStateToProps)(Board)