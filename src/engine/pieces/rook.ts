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

    for(let row = currentSquare.row + 1; row < _board.board.length && !_board.getPiece(Square.at(row, currentSquare.col)); row++) {
      moves.push(Square.at(row, currentSquare.col));
    }
    for(let row = currentSquare.row - 1; row >= 0 && !_board.getPiece(Square.at(row, currentSquare.col)); row--) {
      moves.push(Square.at(row, currentSquare.col));
    }
    for(let col = currentSquare.col + 1; col < _board.board[0].length && !_board.getPiece(Square.at(currentSquare.row,col)); col++) {
      moves.push(Square.at(currentSquare.row, col));
    }
    for(let col = currentSquare.col - 1; col >= 0 && !_board.getPiece(Square.at(currentSquare.row,col)); col--) {
      moves.push(Square.at(currentSquare.row, col));
    }

    return moves;
  }
}
