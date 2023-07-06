import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Rook extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    let moves:Square[] = [];
    let currentSquare = _board.findPiece(this);

    for(let row = 0; row < _board.board.length; row++) {
      if(row !== currentSquare.row){
        moves.push(Square.at(row, currentSquare.col));
      }
    }

    for(let col = 0; col < _board.board.length; col++) {
      if(col !== currentSquare.col){
        moves.push(Square.at(currentSquare.row, col));
      }
    }

    return moves;
  }
}
