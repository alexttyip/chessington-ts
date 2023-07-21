import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Rook extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
      let location = _board.findPiece(this)
      return Piece.lateralMoves(location, _board)
  }
}
