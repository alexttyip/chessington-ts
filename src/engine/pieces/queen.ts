import Board from '../board'
import Player from '../player'
import { diagonalMoves, lateralMoves, Piece } from './piece'
import Square from '../square'

export class Queen extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    try {
      let location = _board.findPiece(this)
      return lateralMoves(location, _board).concat(diagonalMoves((location)))
    }
    catch (e) {
      return [] as Square[]
    }
  }
}
