import Board from '../board'
import { Piece } from './piece'
import Square from '../square'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board) {
    let currentSquare = _board.findPiece(this);
    return Bishop.getMoves(_board, currentSquare);
  }

  static getMoves(_board: Board, currentSquare:Square) {
    let moves:Square[] = [];

    for(let row = 0; row < _board.board.length; row++) {
      if (row === currentSquare.row) {
        continue;
      }

      let offset = row - currentSquare.row;

      let colToFind = currentSquare.col + offset;
      if (colToFind >= 0 && colToFind < _board.board.length) {
        moves.push(Square.at(row, colToFind));
      }

      colToFind = currentSquare.col - offset;
      if (colToFind >= 0 && colToFind < _board.board.length) {
        moves.push(Square.at(row, colToFind));
      }
    }
    return moves;
  }
}
