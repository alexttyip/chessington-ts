import Board from '../board'
import { diagonalMoves, Piece } from './piece'
import Square from '../square'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board) {
    try {
      let location = _board.findPiece(this)
      return diagonalMoves(location)
    }
    catch (e) {
      return [] as Square[]
    }
  }
}
