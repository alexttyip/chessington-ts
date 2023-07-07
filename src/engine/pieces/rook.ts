import Board from '../board'
import Player from '../player'
import Square from '../square'
import { Piece } from './piece'

export class Rook extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board:Board):Square[] {
    let currentSquare = _board.findPiece(this);

    let directions = [
      {
        rowDirection:1,
        colDirection:0
      },
      {
        rowDirection:-1,
        colDirection:0
      },
      {
        rowDirection:0,
        colDirection:1
      },
      {
        rowDirection:0,
        colDirection:-1
      },
    ];

    return this.getMovesAlongAxes(_board, directions, currentSquare);
  }

}
