import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    try {
      let location = _board.findPiece(this)
      let possibleMoves = []
      if(this.player === Player.WHITE) {
        possibleMoves.push(Square.at(location.row + 1, location.col))
        if (location.row === 1) {
          possibleMoves.push(Square.at(location.row + 2, location.col))
        }
      }
      else {
        possibleMoves.push(Square.at(location.row - 1, location.col))
        if (location.row === 6) {
          possibleMoves.push(Square.at(location.row -2, location.col))
        }
      }
      return possibleMoves.filter(_board.isInBoard)
    }
    catch (e) {
      return [] as Square[]
    }
  }
}
