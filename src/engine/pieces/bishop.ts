import Board from '../board'
import { Piece } from './piece'
import Square from '../square'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  isCoordinateValid(row: number, col: number) {
    return (Math.max(row,col) < 8 && Math.min(row,col) >= 0)
  }

  getAvailableMoves(_board: Board) {
    const currentSquare = _board.findPiece(this)
    let availableMoves = []

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row + i
      let newCol = currentSquare.col + i
      if (!this.isCoordinateValid(newRow,newCol)) {
        break
      }
      availableMoves.push(new Square(newRow,newCol))
    }

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row - i
      let newCol = currentSquare.col + i
      if (!this.isCoordinateValid(newRow,newCol)) {
        break
      }
      availableMoves.push(new Square(newRow,newCol))
    }

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row - i
      let newCol = currentSquare.col - i
      if (!this.isCoordinateValid(newRow,newCol)) {
        break
      }
      availableMoves.push(new Square(newRow,newCol))
    }

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row + i
      let newCol = currentSquare.col - i
      if (!this.isCoordinateValid(newRow,newCol)) {
        break
      }
      availableMoves.push(new Square(newRow,newCol))
    }
    return availableMoves as Square[]
  }
}
