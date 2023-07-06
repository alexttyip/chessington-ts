import Board from '../board'
import { Piece } from './piece'
import Square from '../square'
import Player from '../player'
import { King } from './king'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    return Bishop.getMoves(_board, this);
  }

  static getMoves(_board: Board, piece:Piece) {
    let moves:Square[] = [];
    let currentSquare = _board.findPiece(piece);

    for(let offset = 1; offset + currentSquare.row < _board.board.length; offset++) {
      if(Bishop.addMove(_board,piece,moves,offset,1)){
        break;
      }
    }
    for(let offset = -1; offset + currentSquare.row >= 0; offset--) {
      if(Bishop.addMove(_board,piece,moves,offset,1)){
        break;
      }
    }
    for(let offset = 1; offset + currentSquare.row < _board.board.length; offset++) {
      if(Bishop.addMove(_board,piece,moves,offset,-1)){
        break;
      }
    }
    for(let offset = -1; offset + currentSquare.row >= 0; offset--) {
      if(Bishop.addMove(_board,piece,moves,offset,-1)){
        break;
      }
    }

    return moves;
  }

  static addMove(_board:Board, piece:Piece, moves: Square[], offset: number, colOffsetReverse: -1 | 1) {
    let currentSquare = _board.findPiece(piece);
    const newRow = currentSquare.row + offset;
    const newCol = currentSquare.col + colOffsetReverse*offset;

    if(newCol >= _board.board[0].length || newCol < 0) {
      return -1;
    }

    let potentialBlock = _board.getPiece(Square.at(newRow, newCol))
    if(potentialBlock !== undefined) {
      if (potentialBlock.player !== piece.player && !(potentialBlock instanceof King)) {
        moves.push(Square.at(newRow, newCol));
      }
      return -1;
    }

    moves.push(Square.at(newRow, newCol));
    return 0
  }


}
