import Board from '../board'
import Player from '../player'
import Square from '../square'
import GameSettings from '../gameSettings'
import gameSettings from '../gameSettings'
import { King } from './king'



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

  static isKing(piece: Piece | undefined) {
    return piece?.constructor.name === 'King'
  }

  static canCapture(playerLocation: Square, testLocation: Square, board: Board) : boolean {
    if (!board.isInBoard(testLocation)) {
      return false
    }
    const testPiece = board.getPiece(testLocation)
    const playerPiece = board.getPiece(playerLocation)
    return !Piece.isKing(testPiece) && playerPiece?.player !== testPiece?.player
  }

  static findTargetsOrEdgesByDirection(location: Square, board: Board, directions: number[][]) {
    const piece = board.getPiece(location)
    let possibleMoves = []
    for (let direction of directions) {
      for(let steps = 1; steps < gameSettings.BOARD_SIZE; steps++) {
        let newRow = location.row + direction[0] * steps
        let newCol = location.col + direction[1] * steps
        let newLocation = Square.at(newRow, newCol)

        if(board.isSquareWithinBoundsAndEmpty(newLocation)) {
          possibleMoves.push(newLocation)
        }
        else if (Piece.canCapture(location, newLocation, board)) {
          possibleMoves.push(newLocation)
          break
        }
        else {
          break
        }
      }
    }
    return possibleMoves
  }

  static diagonalMoves(location : Square, board: Board) : Square[] {
    let locationChanges = [[1, 1], [-1, 1], [1, -1], [-1, -1]]
    return Piece.findTargetsOrEdgesByDirection(location, board, locationChanges)
  }


  static lateralMoves(location : Square, board : Board) : Square[] {
    let locationChanges = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    return Piece.findTargetsOrEdgesByDirection(location, board, locationChanges)
  }
}
