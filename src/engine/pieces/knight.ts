import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Knight extends Piece {
  constructor(player: Player) {
    super(player)
  }



  getAvailableMoves(_board: Board): Square[] {
    const currentSquare = _board.findPiece(this)
    let availableMoves: Square[] = []

    const movesCombo = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]]

    movesCombo.forEach((combo: number[]) => {
      availableMoves = availableMoves.concat(this.getMoveIfValid(_board, combo[0], combo[1]))
    })

    return availableMoves
  }
}
