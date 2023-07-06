import Board from '../board'
import Player from '../player'
import Square from '../square'
import GameSettings from '../gameSettings'
import gameSettings from '../gameSettings'


export function exploreSides(location: Square, board: Board, locationChanges: number[][]) {
  let possibleMoves = []
  for (let locationChange of locationChanges) {
    for(let steps = 1; steps < gameSettings.BOARD_SIZE; steps++) {
      let newLocation = Square.at(location.row + locationChange[0] * steps, location.col + locationChange[1] * steps)
      if(!board.notOccupiedOrOutOfBounds(newLocation)) {
        break
      }
      possibleMoves.push(newLocation)
    }
  }
  return possibleMoves
}

export function diagonalMoves(location : Square, board: Board) : Square[] {
  let locationChanges = [[1, 1], [-1, 1], [1, -1], [-1, -1]]
  return exploreSides(location, board, locationChanges)
}


export function lateralMoves(location : Square, board : Board) : Square[] {
  let locationChanges = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  return exploreSides(location, board, locationChanges)
}

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
}
