import Board from '../board'
import { Piece } from './piece'
import Square from '../square'



export class King extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    try {
      let location = _board.findPiece(this)
      let possibleMoves = [];
      let possibleChanges = [[1, 1], [-1, 1], [1, -1], [-1, -1], [0, 1], [0, -1], [-1, 0], [1, 0]]
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
