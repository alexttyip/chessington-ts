import Board from '../board'
import { Piece } from './piece'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board) {
    return this.getDiagonalMoves(_board)
  }
}
