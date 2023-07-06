import Board from '../board'
import { Piece, SquareStatus } from './piece'
import Square from '../square'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    return Bishop.getMoves(_board, this);
  }

  static getMoves(_board: Board, piece: Piece) {
    let moves: Square[] = [];
    let currentSquare = _board.findPiece(piece);

    let directions = [
      {
        rowDirection:1,
        colDirection:1
      },
      {
        rowDirection:1,
        colDirection:-1
      },
      {
        rowDirection:-1,
        colDirection:1
      },
      {
        rowDirection:-1,
        colDirection:-1
      },
    ];

    for(const direction of directions) {
      let index = 1;
      let moveStatus = undefined

      do{
        let newRow = currentSquare.row + index * direction.rowDirection;
        let newCol = currentSquare.col + index * direction.colDirection;

        moveStatus = Piece.getMoveStatus(_board, piece, newRow, newCol);
        if(moveStatus !== SquareStatus.UNREACHABLE){
          moves.push(Square.at(newRow, newCol));
        }

        index++;
      } while(moveStatus === SquareStatus.EMPTY);
    }

    return moves;
  }
}
