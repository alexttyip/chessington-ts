import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  pawnFirstMove: number | undefined
  constructor(player: Player) {
    super(player)
    this.pawnFirstMove = undefined
  }



  pawnCaptureCheck(pieceLocation: Square, newLocations: Square[], possibleMoves: Square[], _board: Board) : void {
    for (let newLocation of newLocations) {
      if (Piece.canCapture(pieceLocation, newLocation, _board) && _board.getPiece(newLocation) !== undefined) {
        possibleMoves.push(newLocation)
      }
    }
  }

  pawnMove(location: Square, _board: Board) {
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
    return possibleMoves
  }
  pawnCapture(location: Square, possibleMoves: Square[], _board: Board) {
    if(this.player === Player.WHITE) {
      let newLocations = [Square.at(location.row + 1, location.col + 1), Square.at(location.row + 1, location.col - 1)]
      this.pawnCaptureCheck(location, newLocations, possibleMoves, _board)
    }
    else {
      let newLocations = [Square.at(location.row - 1, location.col + 1), Square.at(location.row - 1, location.col - 1)]
      this.pawnCaptureCheck(location, newLocations, possibleMoves, _board)
    }
  }
  getAvailableMoves(_board: Board): Square[] {
      let location = _board.findPiece(this)
      let possibleMoves = this.pawnMove(location, _board)
      let filteredPossibleMoves = []
      for (let move of possibleMoves) {
        if (_board.isSquareWithinBoundsAndEmpty(move)) {
          filteredPossibleMoves.push(move);
        }
      }
      possibleMoves = filteredPossibleMoves
      this.pawnCapture(location, possibleMoves, _board)
      return possibleMoves
    }
}


