import Board from '../board'
import Player from '../player'
import { Piece, SquareStatus } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    let currentSquare = _board.findPiece(this);
    let moves:Square[] = [];
    let delta = -1;

    if(this.player === Player.WHITE) {
      delta = 1;
    }
    let newSquare = Square.at(currentSquare.row + delta, currentSquare.col);
    if(Piece.getMoveStatus(_board, this, newSquare.row, newSquare.col) === SquareStatus.EMPTY) {
      moves.push(newSquare);

      newSquare = Square.at(currentSquare.row + 2 * delta, currentSquare.col);
      if(!this.moved && Piece.getMoveStatus(_board, this, newSquare.row, newSquare.col) === SquareStatus.EMPTY) {
        moves.push(newSquare);
      }
    }

    [-1,1].forEach(direction=> {
      if(this.checkDiagonal(_board, direction, delta, currentSquare)){
        moves.push(Square.at(currentSquare.row + delta, currentSquare.col + direction));
      }

    })

    return moves;
  }

  checkDiagonal(_board: Board, direction:number, delta:number, currentSquare:Square) {
    if(Piece.getMoveStatus(_board, this, currentSquare.row + delta, currentSquare.col + direction) === SquareStatus.CAPTURABLE){
      return true;
    }
    return false;
  }
}
