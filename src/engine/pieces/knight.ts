import Board from '../board'
import Player from '../player'
import { diagonalMoves, Piece } from './piece'
import Square from '../square'

export class Knight extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    try {
      let location = _board.findPiece(this)
      let possibleMoves = [];
      let possibleChanges = [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]]
      for (let change of possibleChanges) {
        let newLocation = Square.at(location.row + change[0], location.col + change[1])
        if (_board.isInBoard(newLocation)) {
          possibleMoves.push(newLocation)
        }
      }
      return possibleMoves
    }
    catch (e) {
      return [] as Square[]
    }
  }
}
