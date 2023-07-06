import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  constructor(player: Player) {
    super(player)
  }

  checkPossiblePath(_board: Board, currentSquare: Square, rowDelta: number) {
    const newPosition = new Square(currentSquare.row + rowDelta, currentSquare.col)
    if (rowDelta === 2 || rowDelta === -2) {
      const adjacentPosition = new Square(currentSquare.row + rowDelta / 2, currentSquare.col)
      if (_board.getPiece(adjacentPosition) !== undefined) {
        return []
      }
    }
    if (!this.isCoordinateOutOfBound(newPosition.row,newPosition.col) && _board.getPiece(newPosition) === undefined) {
      return [newPosition]
    }
    return []
  }

  takeDiagonalPiece(_board: Board, direction: number) {
    // check row + direction, column + 1
    const currentSquare = _board.findPiece(this)
    let possibleDiagonals : Square[] = []
    let newRow = currentSquare.row + direction
    let newCol = currentSquare.col+1
    if (!this.isCoordinateOutOfBound(newRow,newCol) && this.isSteppingOnEnemyPiece(newRow,newCol,_board) && !this.isSteppingOnEnemyKing(newRow,newCol,_board)) {
      possibleDiagonals.push(new Square(newRow,newCol))
    }
    newCol = currentSquare.col-1
    if (!this.isCoordinateOutOfBound(newRow,newCol) && this.isSteppingOnEnemyPiece(newRow,newCol,_board) && !this.isSteppingOnEnemyKing(newRow,newCol,_board)) {
      possibleDiagonals.push(new Square(newRow,newCol))
    }
    return possibleDiagonals
  }

  getAvailableMoves(_board: Board): Square[] {
    const currentSquare = _board.findPiece(this)
    let availableMoves: Square[] = []
    let direction
    if (this.player === Player.WHITE) {
      direction = 1
    } else {
      direction = -1
    }
    availableMoves = availableMoves.concat(this.checkPossiblePath(_board, currentSquare, direction))
    if (currentSquare.row === 1 || currentSquare.row === 6) {
      availableMoves = availableMoves.concat(this.checkPossiblePath(_board, currentSquare, 2 * direction))
    }

    availableMoves = availableMoves.concat(this.takeDiagonalPiece(_board, direction))
    return availableMoves
  }
}
