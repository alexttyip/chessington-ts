import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Rook extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    let currentSquare = _board.findPiece(this);
    return Rook.getMoves(_board, currentSquare);
  }

  static getMoves(_board:Board, currentSquare:Square) {
    let moves:Square[] = [];

    for(let row = 0; row < _board.board.length; row++) {
      if(row !== currentSquare.row){
        moves.push(Square.at(row, currentSquare.col));
      }
    }

    for(let col = 0; col < _board.board[0].length; col++) {
      if(col !== currentSquare.col){
        moves.push(Square.at(currentSquare.row, col));
      }
    }

    return moves;
  }
}
