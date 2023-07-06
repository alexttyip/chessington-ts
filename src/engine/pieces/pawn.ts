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
    const oneSquareUp = new Square(currentSquare.row+1, currentSquare.col)
    return [oneSquareUp] as Square[]
  }
}
