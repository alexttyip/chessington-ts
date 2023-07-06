import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'
import { King } from './king'

export class Knight extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    let moves: Square[] = [];
    let currentSquare = _board.findPiece(this);

    for(let row = Math.max(0,currentSquare.row-2); row < Math.min(_board.board.length, currentSquare.row+3); row++) {
      if(row === currentSquare.row){
        continue;
      }

      let offset = 3 - Math.abs(row - currentSquare.row);

      let col = currentSquare.col + offset;
      Knight.addMove(_board, row, col, moves, this);
      col = currentSquare.col - offset;
      Knight.addMove(_board, row, col, moves, this);
    }

    return moves;
  }

  static addMove(_board:Board, row:number, col:number, moves:Square[], piece:Piece){
    let targetSquare = Square.at(row, col);
    let potentialPiece = _board.getPiece(targetSquare);
    if(!!potentialPiece && (potentialPiece.player === piece.player || potentialPiece instanceof King)){
      return;
    }
    if(col >= 0 && col < _board.board[row].length){
      moves.push(Square.at(row, col));
    }
  }
}
