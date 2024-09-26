import Board from '../board'
import Square from '../square'
import { Piece } from './piece'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board):(Square)[] {
    let currentSquare = _board.findPiece(this);

    let directions = [
      {
        rowDirection:1,
        colDirection:1
      },
      {
        rowDirection:-1,
        colDirection:-1
      },
      {
        rowDirection:-1,
        colDirection:1
      },
      {
        rowDirection:1,
        colDirection:-1
      },
    ];

    return this.getMovesAlongAxes(_board, directions, currentSquare);
  }
}
