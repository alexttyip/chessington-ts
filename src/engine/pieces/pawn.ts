import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    const currentSquare = _board.findPiece(this)
    let availableMoves = []
    if (this.player === Player.WHITE) {
      availableMoves.push(new Square(currentSquare.row + 1, currentSquare.col))
    } else {
      availableMoves.push(new Square(currentSquare.row-1, currentSquare.col))
    }
    return availableMoves as Square[]
  }
}
