import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  constructor(player: Player) {
    super(player)
  }

  returnMoveIfItIsPossible(_board: Board, currentSquare: Square, rowDelta: number) {
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
    const currentSquare = _board.findPiece(this)
    let possibleDiagonals : Square[] = []
    let newRow = currentSquare.row + direction
    this.addMoveIfCanCapture(newRow, currentSquare.col+1, _board, possibleDiagonals)
    this.addMoveIfCanCapture(newRow, currentSquare.col-1, _board, possibleDiagonals)
    return possibleDiagonals
  }

  addMoveIfCanCapture(newRow: number, newCol: number, _board: Board, possibleDiagonals: Square[]) {
    if (!this.isCoordinateOutOfBound(newRow, newCol) && this.isSteppingOnEnemyPiece(newRow, newCol, _board) && !this.isSteppingOnEnemyKing(newRow, newCol, _board)) {
      possibleDiagonals.push(new Square(newRow, newCol))
    }
  }

  canEnPassantThisSquare(newRow: number, newCol: number, _board: Board, direction: number) {
    const currentSquare = _board.findPiece(this)
    if (currentSquare.row === 3 || currentSquare.row === 4) {
      let behindPiece = _board.getPiece(new Square(newRow-direction, newCol))
      if (this.isAPawn(behindPiece) && this.isSteppingOnEnemyPiece(newRow-direction, newCol, _board) && behindPiece?.numOfMoveMade === 1 && behindPiece?.wasMovedInTurn === _board.boardMoveNumber - 1) {
        return true
      }
    }
    return false
  }

  private isAPawn(behindPiece: Piece | undefined) {
    return behindPiece?.constructor.name === 'Pawn'
  }

  addEnPassantMoves(_board: Board, direction: number) {
    const currentSquare = _board.findPiece(this)
    return this.addEnPassantMoveIfPossible(currentSquare, direction, currentSquare.col + 1, _board).concat(
      this.addEnPassantMoveIfPossible(currentSquare, direction, currentSquare.col - 1, _board))
  }

  private addEnPassantMoveIfPossible(currentSquare: Square, direction: number, newCol1: number, _board: Board) {
    if (this.canEnPassantThisSquare(currentSquare.row + direction, newCol1, _board, direction)) {
      return [new Square(currentSquare.row + direction, newCol1)]
    }
    return []
  }

  getAvailableMoves(_board: Board): Square[] {
    const currentSquare = _board.findPiece(this)
    let availableMoves: Square[] = []
    let direction = this.player === Player.WHITE ? 1 : -1
    availableMoves.push(...this.returnMoveIfItIsPossible(_board, currentSquare, direction))
    if (currentSquare.row === 1 || currentSquare.row === 6) {
      availableMoves.push(...this.returnMoveIfItIsPossible(_board, currentSquare, 2 * direction))
    }
    availableMoves.push(...this.takeDiagonalPiece(_board, direction))

    availableMoves.push(...this.addEnPassantMoves(_board, direction))

    return availableMoves
  }
}
