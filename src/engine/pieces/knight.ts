import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Knight extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
      let location = _board.findPiece(this)
      let possibleMoves = [];
      let possibleChanges = [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]]
      for (let change of possibleChanges) {
        let newLocation = Square.at(location.row + change[0], location.col + change[1])
        if (Piece.canCapture(location, newLocation, _board)) {
          possibleMoves.push(newLocation)
        }
      }
      return possibleMoves
  }
}
