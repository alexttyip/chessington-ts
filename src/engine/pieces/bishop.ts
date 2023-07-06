import Board from '../board'
import { Piece } from './piece'
import Square from '../square'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board) {
    try {
      let location = _board.findPiece(this)
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
    catch (e) {
      return [] as Square[]
    }
  }
}
