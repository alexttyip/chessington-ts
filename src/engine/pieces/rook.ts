import Board from '../board'
import Player from '../player'
import { lateralMoves, Piece } from './piece'
import Square from '../square'

export class Rook extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    try {
      let location = _board.findPiece(this)
      return lateralMoves(location, _board)
    }
    catch (e) {
      return [] as Square[]
    }
  }
}
