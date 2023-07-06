import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Rook extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    const currentSquare = _board.findPiece(this)
    let availableMoves = []

    for (let row = 0; row <= 7; row++) {
      if (row !== currentSquare.row) {
        availableMoves.push(new Square(row, currentSquare.col))
      }
    }
    for (let col = 0; col <= 7; col++) {
      if (col !== currentSquare.col) {
        availableMoves.push(new Square(currentSquare.row, col))
      }
    }

    return availableMoves as Square[]
  }
}
