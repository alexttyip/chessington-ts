import Board from '../board'
import { Piece } from './piece'
import Square from '../square'

export class King extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    const currentSquare = _board.findPiece(this)
    let availableMoves: Square[] = []

    const movesCombo = [[0,1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]

    movesCombo.forEach((combo: number[]) => {
      availableMoves = availableMoves.concat(this.getMoveIfValid(currentSquare, combo[0], combo[1]))
    })

    return availableMoves
  }
}
