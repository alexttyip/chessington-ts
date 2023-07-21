import Board from '../board'
import { Piece } from './piece'
import Square from '../square'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board) {
      let location = _board.findPiece(this)
      return Piece.diagonalMoves(location, _board)
  }
}
