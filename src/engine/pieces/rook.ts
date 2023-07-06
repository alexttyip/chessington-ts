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

    for (let i = 0; i <= 7; i++) {
      availableMoves.push(new Square(i, currentSquare.col))
      availableMoves.push(new Square(currentSquare.row, i))
    }
    availableMoves.splice(availableMoves.findIndex((item) => item.col === currentSquare.col && item.row === currentSquare.row), 1)
    availableMoves.splice(availableMoves.findIndex((item) => item.col === currentSquare.col && item.row === currentSquare.row), 1)
    return availableMoves as Square[]
  }
}
