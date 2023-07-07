import Board from '../board'
import { Piece } from './piece'
import Square from '../square'
import {Rook} from "./rook";



export class King extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  canCastle(possibleRookLocation: Square, board: Board): boolean {
      let possibleRook = board.getPiece(possibleRookLocation)
      if(possibleRook instanceof Rook && typeof possibleRook.firstMove === 'undefined') {
          let leftBound = Math.min(possibleRookLocation.col, board.findPiece(this).col) + 1
          let rightBound = Math.max(possibleRookLocation.col, board.findPiece(this).col) - 1
          for(let col = leftBound; col <= rightBound; col++) {
              if(board.getPiece(Square.at(col, possibleRookLocation.row))) {
                  return false
              }
          }
          return true
      }
      return false
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

      if(typeof this.firstMove === 'undefined') {
          let possibleRookLocations = [Square.at(location.row, 0), Square.at(location.row, 7)]
          for(let possibleRookLocation of possibleRookLocations) {
              if(this.canCastle(possibleRookLocation, _board)) {
                  let columnDifference = -Math.sign(location.col - possibleRookLocation.col)
                  possibleMoves.push(Square.at(location.row, location.col + 2 * columnDifference))
              }
          }
      }

      return possibleMoves
  }
}
