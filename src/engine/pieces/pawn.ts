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
      if(this.player === Player.WHITE) {
        return [Square.at(location.row + 1, location.col)]
      }
      else {
        return [Square.at(location.row - 1, location.col)]
      }
    }
    catch (e) {
      return [] as Square[]
    }
  }
}
