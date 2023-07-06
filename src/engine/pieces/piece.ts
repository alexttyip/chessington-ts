import Board from '../board'
import Player from '../player'
import Square from '../square'
import GameSettings from '../gameSettings'

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

export function lateralMoves(location : Square, board : Board) : Square[] {
  let possibleMoves = []

  for(let newColumn = location.col + 1; board.notOccupiedOrOutOfBounds(Square.at(location.row, newColumn)); newColumn++) {
    possibleMoves.push(Square.at(location.row, newColumn))
  }

  for(let newColumn = location.col - 1; board.notOccupiedOrOutOfBounds(Square.at(location.row, newColumn)); newColumn--) {
    possibleMoves.push(Square.at(location.row, newColumn))
  }

  for(let newRow = location.row + 1; board.notOccupiedOrOutOfBounds(Square.at(newRow, location.col)); newRow++) {
    possibleMoves.push(Square.at(newRow, location.col))
  }

  for(let newRow = location.row - 1; board.notOccupiedOrOutOfBounds(Square.at(newRow, location.col)); newRow--) {
    possibleMoves.push(Square.at(newRow, location.col))
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
