import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Queen extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    const currentSquare = _board.findPiece(this)
    const lateralMoves = this.getLateralMoves(currentSquare)
    const diagonalMoves = this.getDiagonalMoves(currentSquare)
    return lateralMoves.concat(diagonalMoves)
  }
}
