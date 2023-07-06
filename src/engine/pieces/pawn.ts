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

    if(this.offBoard(_board, currentSquare, delta)){
      return []
    }
    if(this.blockMovement(_board, currentSquare, delta)) {
      return []
    }

    moves.push(Square.at(currentSquare.row + delta, currentSquare.col));
    if(currentSquare.row + 2 *delta < _board.board.length && currentSquare.row + 2 *delta >= 0
      && !this.moved && !_board.getPiece(Square.at(currentSquare.row + 2*delta, currentSquare.col))) {
      moves.push(Square.at(currentSquare.row + 2 *delta, currentSquare.col));
    }

    return moves;
  }

  blockMovement(_board:Board, currentSquare:Square, delta:number) {
    return !!_board.getPiece(Square.at(currentSquare.row + delta, currentSquare.col));
  }

  offBoard(_board:Board, currentSquare:Square, delta:number){
    return currentSquare.row + delta >= _board.board.length || currentSquare.row + delta < 0
      || !!_board.getPiece(Square.at(currentSquare.row + delta, currentSquare.col));

  }
}
