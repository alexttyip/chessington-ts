import Board from '../board'
import { Piece } from './piece'
import Square from '../square'



export class King extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
      let location = _board.findPiece(this)
      let possibleMoves = [];
      for (let rowChange = -1; rowChange <= 1; rowChange++) {
        for(let colChange = -1; colChange <= 1; colChange++) {
            let newLocation = Square.at(location.row + rowChange, location.col + colChange)
            if (Piece.canCapture(location, newLocation, _board)) {
                possibleMoves.push(newLocation)
            }
        }

      }
      return possibleMoves
  }
}
