import Board from '../board'
import Player from '../player'
import Square from '../square'

export class Piece {
  player: symbol
  constructor(player: Player) {
    this.player = player
  }

  getLateralMoves(currentSquare: Square) {
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
