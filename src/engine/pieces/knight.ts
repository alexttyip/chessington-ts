import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Knight extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getMoveIfValid(currentSquare: Square, rowDelta:number, colDelta:number) {
    let newRow = currentSquare.row + rowDelta
    let newCol = currentSquare.col + colDelta

    if (this.isCoordinateValid(newRow, newCol)) {
      return [new Square(newRow, newCol)]
    } else {
      return []
    }
  }

  getAvailableMoves(_board: Board): Square[] {
    const currentSquare = _board.findPiece(this)
    let availableMoves: Square[] = []

    const movesCombo = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]]

    movesCombo.forEach((combo: number[]) => {
      availableMoves = availableMoves.concat(this.getMoveIfValid(currentSquare, combo[0], combo[1]))
    })

    return availableMoves
  }
}
