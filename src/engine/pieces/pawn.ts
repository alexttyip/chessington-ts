import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    let currentSquare = _board.findPiece(this);
    let moves = [];
    let delta = -1;

    if(this.player === Player.WHITE) {
      delta = 1;
    }

    moves.push(Square.at(currentSquare.row + delta, currentSquare.col));
    if(!this.moved) {
      moves.push(Square.at(currentSquare.row + 2 *delta, currentSquare.col));
    }

    return moves;
  }
}
