import Board from '../board'
import { canCapture, Piece } from './piece'
import Square from '../square'



export class King extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
      let location = _board.findPiece(this)
      let possibleMoves = [];
      let possibleChanges = [[1, 1], [-1, 1], [1, -1], [-1, -1], [0, 1], [0, -1], [-1, 0], [1, 0]]
      for (let change of possibleChanges) {
        let newLocation = Square.at(location.row + change[0], location.col + change[1])
        if (canCapture(location, newLocation, _board)) {
          possibleMoves.push(newLocation)
        }
      }
      return possibleMoves
  }
}
