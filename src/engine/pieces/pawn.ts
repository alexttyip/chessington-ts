import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    let currentSquare = _board.findPiece(this);
    if(this.player === Player.WHITE){
      return [Square.at(currentSquare.row+1, currentSquare.col)];
    }
    return [Square.at(currentSquare.row-1, currentSquare.col)];
  }
}
