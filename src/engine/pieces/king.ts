import Board from '../board'
import { Piece } from './piece'
import Square from '../square'

export class King extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    let moves:Square[] = [];
    let currentSquare = _board.findPiece(this);
    for(let row = currentSquare.row - 1; row <= currentSquare.row + 1; row++) {
      for(let col = currentSquare.col - 1; col <= currentSquare.col + 1; col++) {
        if(row === currentSquare.row && col === currentSquare.col) {
          continue;
        }
        moves.push(Square.at(row, col));
      }
    }
    return moves;
  }
}
