import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

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
      if(col >= 0 && col < _board.board[row].length){
        moves.push(Square.at(row, col));
      }
      col = currentSquare.col - offset;
      if(col >= 0 && col < _board.board[row].length){
        moves.push(Square.at(row, col));
      }
    }

    return moves;
  }
}
