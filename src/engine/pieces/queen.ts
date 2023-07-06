import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Queen extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    const lateralMoves = this.getLateralMoves(_board)
    const diagonalMoves = this.getDiagonalMoves(_board)
    return lateralMoves.concat(diagonalMoves)
  }
}
