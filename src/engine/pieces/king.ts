import Board from '../board'
import { Piece } from './piece'
import Square from '../square'

export class King extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {

    const movesCombo = [[0,1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]

    return movesCombo.flatMap((combo: number[]) => this.getMoveIfValid(_board, combo[0], combo[1]))
  }
}
