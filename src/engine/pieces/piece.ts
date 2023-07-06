import Board from '../board'
import Player from '../player'
import Square from '../square'

export class Piece {
  player: symbol

  constructor(player: Player) {
    this.player = player
  }

  getLateralMoves(board: Board) {
    const currentSquare = board.findPiece(this)
    let availableMoves = []

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row + i
      if (!this.isCoordinateValid(newRow, currentSquare.col, board)) {
        break
      }
      availableMoves.push(new Square(newRow, currentSquare.col))
    }

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row - i
      if (!this.isCoordinateValid(newRow, currentSquare.col, board)) {
        break
      }
      availableMoves.push(new Square(newRow, currentSquare.col))
    }

    for (let i = 1; i < 8; i++) {
      let newCol = currentSquare.col + i
      if (!this.isCoordinateValid(currentSquare.row, newCol, board)) {
        break
      }
      availableMoves.push(new Square(currentSquare.row, newCol))
    }

    for (let i = 1; i < 8; i++) {
      let newCol = currentSquare.col - i
      if (!this.isCoordinateValid(currentSquare.row, newCol, board)) {
        break
      }
      availableMoves.push(new Square(currentSquare.row, newCol))
    }

    return availableMoves as Square[]
  }

  isCoordinateOutOfBound(row: number, col: number) {
    return !(Math.max(row, col) < 8 && Math.min(row, col) >= 0)
  }

  isSteppingOnPiece(row: number, col: number, board: Board) {
    return board.getPiece(new Square(row, col)) !== undefined
  }

  isCoordinateValid(row: number, col: number, board: Board) {
    if (this.isCoordinateOutOfBound(row, col)) {
      return false
    }

    if (this.isSteppingOnPiece(row, col, board)) {
      return false
    }

    return true
  }

  getMoveIfValid(currentSquare: Square, rowDelta:number, colDelta:number) {
    let newRow = currentSquare.row + rowDelta
    let newCol = currentSquare.col + colDelta

    if (!this.isCoordinateOutOfBound(newRow, newCol)) {
      return [new Square(newRow, newCol)]
    } else {
      return []
    }
  }

  getDiagonalMoves(board: Board) {
    const currentSquare = board.findPiece(this)
    let availableMoves = []

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row + i
      let newCol = currentSquare.col + i
      if (!this.isCoordinateValid(newRow, newCol, board)) {
        break
      }
      availableMoves.push(new Square(newRow, newCol))
    }

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row - i
      let newCol = currentSquare.col + i
      if (!this.isCoordinateValid(newRow, newCol, board)) {
        break
      }
      availableMoves.push(new Square(newRow, newCol))
    }

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row - i
      let newCol = currentSquare.col - i
      if (!this.isCoordinateValid(newRow, newCol, board)) {
        break
      }
      availableMoves.push(new Square(newRow, newCol))
    }

    for (let i = 1; i < 8; i++) {
      let newRow = currentSquare.row + i
      let newCol = currentSquare.col - i
      if (!this.isCoordinateValid(newRow, newCol, board)) {
        break
      }
      availableMoves.push(new Square(newRow, newCol))
    }
    return availableMoves as Square[]

  }

  getAvailableMoves(_board: Board): Square[] {
    throw new Error(
      'This method must be implemented, and return a list of available moves',
    )
  }

  moveTo(board: Board, newSquare: Square) {
    const currentSquare = board.findPiece(this)
    board.movePiece(currentSquare, newSquare)
  }
}
