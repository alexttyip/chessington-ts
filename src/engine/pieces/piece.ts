import Board from '../board'
import Player from '../player'
import Square from '../square'

export class Piece {
  player: symbol
  numOfMoveMade = 0
  wasMovedInTurn = -1

  constructor(player: Player) {
    this.player = player
  }

  goInADirectionAndReturnAvailableMoves(board: Board, rowDelta: number, colDelta: number) {
    const currentSquare = board.findPiece(this)
    let availableMoves = []
    let hitEnemyYet = false
    for (let i = 1; i < 8; i++) {
      if (hitEnemyYet) {
        break
      }
      let newRow = currentSquare.row + rowDelta * i
      let newCol = currentSquare.col + colDelta * i
      if (!this.canItMoveOnTopOfThisSquare(newRow, newCol, board)) {
        break
      }
      if (this.isSteppingOnEnemyPiece(newRow, newCol, board)) {
        hitEnemyYet = true
      }
      availableMoves.push(new Square(newRow, newCol))
    }
    return availableMoves
  }

  getLateralMoves(board: Board) {
    const currentSquare = board.findPiece(this)
    let availableMoves: Square[] = []

    availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, 1, 0))

    availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, -1, 0))

    availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, 0, 1))

    availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, 0, -1))

    return availableMoves
  }

  isCoordinateOutOfBound(row: number, col: number) {
    return !(Math.max(row, col) < 8 && Math.min(row, col) >= 0)
  }

  isSteppingOnFriendlyPiece(row: number, col: number, board: Board) {
    return board.getPiece(new Square(row, col))?.player === this.player
  }

  isSteppingOnEnemyPiece(row: number, col: number, board: Board) {
    return board.getPiece(new Square(row, col)) && board.getPiece(new Square(row, col))?.player !== this.player
  }

  isSteppingOnEnemyKing(row: number, col: number, board: Board) {
    return board.getPiece(new Square(row, col))?.constructor.name === 'King'
  }

  canItMoveOnTopOfThisSquare(row: number, col: number, board: Board) {
    if (this.isCoordinateOutOfBound(row, col)) {
      return false
    }

    if (this.isSteppingOnFriendlyPiece(row, col, board)) {
      return false
    }

    if (this.isSteppingOnEnemyKing(row, col, board)) {
      return false
    }

    return true
  }

  getMoveIfLegal(board: Board, rowDelta: number, colDelta: number) {

    const currentSquare = board.findPiece(this)
    let newRow = currentSquare.row + rowDelta
    let newCol = currentSquare.col + colDelta


    if (this.isCoordinateOutOfBound(newRow, newCol)) {
      return []
    }
    if (this.isSteppingOnFriendlyPiece(newRow, newCol, board)) {
      return []
    }
    if (this.isSteppingOnEnemyKing(newRow, newCol, board)) {
      return []
    }

    return [new Square(newRow, newCol)]
  }

  getDiagonalMoves(board: Board) {
    let availableMoves: Square[] = []

    availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, 1, 1))

    availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, -1, 1))

    availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, 1, -1))

    availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, -1, -1))

    return availableMoves as Square[]

  }

  getAvailableMoves(_board: Board): Square[] {
    throw new Error(
      'This method must be implemented, and return a list of available moves',
    )
  }

  isAPawn(piece: Piece | undefined) {
    return piece?.constructor.name === 'Pawn'
  }

  isMoveEnPassant(board: Board, newSquare: Square) {
    const currentSquare = board.findPiece(this)
    return this.isAPawn(this) && currentSquare.col !== newSquare.col && !board.getPiece(newSquare);

  }

  moveTo(board: Board, newSquare: Square) {
    const currentSquare = board.findPiece(this)
    if (this.isMoveEnPassant(board, newSquare)) {
      if (this.player === Player.WHITE) {
        board.setPiece(new Square(newSquare.row - 1, newSquare.col), undefined)
      } else {
        board.setPiece(new Square(newSquare.row + 1, newSquare.col), undefined)
      }
    }
    board.movePiece(currentSquare, newSquare)
  }
}
