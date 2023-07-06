import Board from '../board'
import Player from '../player'
import Square from '../square'

export function diagonalMoves(location : Square) : Square[] {
  let possibleMoves = []
  let sum = location.row + location.col
  let diff = location.row - location.col
  for (let i = 0; i < 8; i++) {
    let newRow = i
    if (newRow === location.row) {
      continue
    }

    let newColumn = sum - newRow
    if (newColumn >= 0 && newColumn <= 7) {
      possibleMoves.push(Square.at(newRow, newColumn))
    }

    newColumn = newRow - diff
    if (newColumn >= 0 && newColumn <= 7) {
      possibleMoves.push(Square.at(newRow, newColumn))
    }
  }
  return possibleMoves
}

export function lateralMoves(location : Square) : Square[] {
  let possibleMoves = []
  for (let i = 0; i < 8; i++) {
    if (i !== location.col) {
      possibleMoves.push(Square.at(location.row, i))
    }
    if (i !== location.row) {
      possibleMoves.push(Square.at(i, location.col))
    }
  }
  return possibleMoves
}

export class Piece {
  player: symbol
  constructor(player: Player) {
    this.player = player
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
