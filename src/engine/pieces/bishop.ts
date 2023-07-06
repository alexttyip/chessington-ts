import Board from '../board'
import { Piece } from './piece'
import Square from '../square'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board) {
    const currentSquare = _board.findPiece(this)
    let availableMoves = []

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row + i
      let newCol = currentSquare.col + i
      if (newRow > 7 || newCol > 7) {
        break
      }
      availableMoves.push(new Square(newRow,newCol))
    }

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row - i
      let newCol = currentSquare.col + i
      if (newRow < 0 || newCol > 7) {
        break
      }
      availableMoves.push(new Square(newRow,newCol))
    }

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row - i
      let newCol = currentSquare.col - i
      if (newRow < 0 || newCol < 0) {
        break
      }
      availableMoves.push(new Square(newRow,newCol))
    }

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row + i
      let newCol = currentSquare.col - i
      if (newRow > 7 || newCol < 0) {
        break
      }
      availableMoves.push(new Square(newRow,newCol))
    }
    return availableMoves as Square[]
  }
}
