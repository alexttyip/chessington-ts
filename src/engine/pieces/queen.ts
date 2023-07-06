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
    let currentSquare = _board.findPiece(this);

    let moves = Bishop.getMoves(_board, currentSquare)
    moves = moves.concat(Rook.getMoves(_board, currentSquare));

    return moves;
  }
}
