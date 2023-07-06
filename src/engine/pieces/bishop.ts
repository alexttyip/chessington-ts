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

    for(let offset = 1; offset + currentSquare.row < _board.board.length; offset++) {
      if(Bishop.addMove(_board,currentSquare,moves,offset,1)){
        break;
      }
    }
    for(let offset = -1; offset + currentSquare.row >= 0; offset--) {
      if(Bishop.addMove(_board,currentSquare,moves,offset,1)){
        break;
      }
    }
    for(let offset = 1; offset + currentSquare.row < _board.board.length; offset++) {
      if(Bishop.addMove(_board,currentSquare,moves,offset,-1)){
        break;
      }
    }
    for(let offset = -1; offset + currentSquare.row >= 0; offset--) {
      if(Bishop.addMove(_board,currentSquare,moves,offset,-1)){
        break;
      }
    }

    return moves;
  }

  static addMove(_board:Board, currentSquare:Square, moves: Square[], offset: number, colOffsetReverse: -1 | 1) {
    const newRow = currentSquare.row + offset;
    const newCol = currentSquare.col + colOffsetReverse*offset;
    if(newCol >= _board.board[0].length || newCol < 0) {
      return -1;
    }
    if(!!_board.getPiece(Square.at(newRow, newCol))) {
      return -1;
    }
    moves.push(Square.at(newRow, newCol));
    return 0
  }
}
