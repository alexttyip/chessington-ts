import Board from '../board'
import Player from '../player'
import { Piece, SquareStatus } from './piece'
import Square from '../square'
import { King } from './king'

export class Rook extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(_board: Board): Square[] {
    return Rook.getMoves(_board, this);
  }

  static getMoves(_board:Board, piece:Piece) {
    let moves:Square[] = [];
    let currentSquare = _board.findPiece(piece);
    let player = piece.player;

    for(let row = currentSquare.row + 1; row < _board.board.length; row++) {
      const moveStatus = this.getMoveStatus(_board, piece, row, currentSquare.col)
      if(moveStatus === SquareStatus.UNREACHABLE) {
        break;
      }
      moves.push(Square.at(row, currentSquare.col));
      if(moveStatus === SquareStatus.CAPTURABLE) {
        break;
      }
    }
    for(let row = currentSquare.row - 1; row >= 0; row--) {
      const moveStatus = this.getMoveStatus(_board, piece, row, currentSquare.col)
      if(moveStatus === SquareStatus.UNREACHABLE) {
        break;
      }
      moves.push(Square.at(row, currentSquare.col));
      if(moveStatus === SquareStatus.CAPTURABLE) {
        break;
      }
    }
    for(let col = currentSquare.col + 1; col < _board.board[0].length; col++) {
      const moveStatus = this.getMoveStatus(_board, piece, currentSquare.row, col);
      if(moveStatus === SquareStatus.UNREACHABLE) {
        break;
      }
      moves.push(Square.at(currentSquare.row, col));
      if(moveStatus === SquareStatus.CAPTURABLE) {
        break;
      }
    }
    for(let col = currentSquare.col - 1; col >= 0; col--) {
      const moveStatus = this.getMoveStatus(_board, piece, currentSquare.row, col);
      if(moveStatus === SquareStatus.UNREACHABLE) {
        break;
      }
      moves.push(Square.at(currentSquare.row, col));
      if(moveStatus === SquareStatus.CAPTURABLE) {
        break;
      }
    }

    return moves;
  }

}
