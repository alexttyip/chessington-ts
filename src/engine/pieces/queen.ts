import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'
import { Bishop } from './bishop'
import { Rook } from './rook'

export class Queen extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    let moves = Bishop.getMoves(_board, this)
    moves = moves.concat(Rook.getMoves(_board, this));

    return moves;
  }
}
