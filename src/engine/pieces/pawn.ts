import Board from '../board'
import Player from '../player'
import { canCapture, Piece } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    try {
      let location = _board.findPiece(this)
      let possibleMoves = []
      if(this.player === Player.WHITE) {
        possibleMoves.push(Square.at(location.row + 1, location.col))
        if (location.row === 1 && !_board.getPiece(Square.at(location.row + 1, location.col))) {
          possibleMoves.push(Square.at(location.row + 2, location.col))
        }
      }
      else {
        possibleMoves.push(Square.at(location.row - 1, location.col))
        if (location.row === 6 && !_board.getPiece(Square.at(location.row - 1, location.col))) {
          possibleMoves.push(Square.at(location.row - 2, location.col))
        }
      }

      let filteredPossibleMoves = []
      for (let move of possibleMoves) {
        if (_board.notOccupiedOrOutOfBounds(move)) {
          filteredPossibleMoves.push(move);
        }
      }

      possibleMoves = filteredPossibleMoves

      if(this.player === Player.WHITE) {
        let newLocations = [Square.at(location.row + 1, location.col + 1), Square.at(location.row + 1, location.col - 1)]
        for (let newLocation of newLocations) {
          if (canCapture(location, newLocation, _board) && _board.getPiece(newLocation) !== undefined) {
            possibleMoves.push(newLocation)
          }
        }
      }
      else {
        let newLocations = [Square.at(location.row - 1, location.col + 1), Square.at(location.row - 1, location.col - 1)]
        for (let newLocation of newLocations) {
          if (canCapture(location, newLocation, _board) && _board.getPiece(newLocation) !== undefined) {
            possibleMoves.push(newLocation)
          }
        }
      }

      return possibleMoves
    }
    catch (e) {
      return [] as Square[]
    }
  }
}
