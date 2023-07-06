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

    if(this.blockMovement(_board, currentSquare, delta)) {
      return []
    }

    moves.push(Square.at(currentSquare.row + delta, currentSquare.col));
    if(!this.moved && !_board.getPiece(Square.at(currentSquare.row + 2*delta, currentSquare.col))) {
      moves.push(Square.at(currentSquare.row + 2 *delta, currentSquare.col));
    }

    return moves;
  }

  blockMovement(_board:Board, currentSquare:Square, delta:number) {
    return !!_board.getPiece(Square.at(currentSquare.row + delta, currentSquare.col));
  }
}
