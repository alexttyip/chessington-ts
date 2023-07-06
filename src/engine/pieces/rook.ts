import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Rook extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    try {
      let location = _board.findPiece(this)
      let possibleMoves = []
      for (let i = 0; i < 8; i++) {
        if (i !== location.col) {
          possibleMoves.push(Square.at(location.row, i))
        }
        if (i !== location.row) {
          possibleMoves.push(Square.at(i, location.col))
        }
      }
      return possibleMoves
    }
    catch (e) {
      return [] as Square[]
    }
  }
}
