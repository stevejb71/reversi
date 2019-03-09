import { connect } from 'react-redux'
import { updateBoard } from './redux/Actions'
import { State } from './redux/State'
import { Board } from './Board'

const mapStateToProps = (state: State) => {
  return {
    board: state.board
  }
}

const mapDispatchToProps = { updateBoard }

export const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)