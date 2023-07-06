import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Queen extends Piece {
  constructor(player: Player) {
    super(player)
  }

  isCoordinateValid(row: number, col: number) {
    return (Math.max(row,col) < 8 && Math.min(row,col) >= 0)
  }

  getAvailableMoves(_board: Board): Square[] {
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
