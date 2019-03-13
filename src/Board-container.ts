import { connect } from 'react-redux'
import { State } from './redux/State'
import { Board, BoardProps } from './Board'

function mapStateToProps(state: State): Pick<BoardProps, 'board' | 'size'> {
  return {
    board: state.board,
    size: state.boardSize
  }
}

export const BoardContainer = connect(mapStateToProps)(Board)