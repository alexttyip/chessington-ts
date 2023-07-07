import Board from '../board'
import Player from '../player'
import { Piece, SquareStatus } from './piece'
import Square from '../square'
import { King } from './king'

export class Knight extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    let moves: Square[] = [];
    let currentSquare = _board.findPiece(this);
    for (let row = currentSquare.row - 2; row <= currentSquare.row + 2; row++) {
      for (let col = currentSquare.col - 2; col <= currentSquare.col + 2; col++) {
        if(!this.isValidKnightMove(row, col, currentSquare)) {
          continue;
        }
        if (Piece.getMoveStatus(_board, this, row, col) !== SquareStatus.UNREACHABLE) {
          moves.push(Square.at(row, col));
        }
      }
    }
    return moves;
  }

  isValidKnightMove(row:number, col:number, currentSquare:Square) {
    let rowDifference = Math.abs(row - currentSquare.row);
    let colDifference = Math.abs(col - currentSquare.col);

    if(rowDifference === 1 && colDifference === 2) {
      return true;
    }
    if (rowDifference === 2 && colDifference === 1) {
      return true;
    }
    return false;
  }

}
