import Board from '../board'
import { Piece } from './piece'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }


  getAvailableMoves(_board: Board) {
    const currentSquare = _board.findPiece(this)
    return this.getDiagonalMoves(currentSquare, _board)
  }
}
