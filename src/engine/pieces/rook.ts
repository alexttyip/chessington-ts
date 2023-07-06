import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
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
      let err = Rook.addRowMove(_board, currentSquare, moves, row, player);
      if(err === -1) break;
    }
    for(let row = currentSquare.row - 1; row >= 0; row--) {
      let err = Rook.addRowMove(_board, currentSquare, moves, row, player);
      if(err === -1) break;
    }
    for(let col = currentSquare.col + 1; col < _board.board[0].length; col++) {
      let err = Rook.addColMove(_board, currentSquare, moves, col, player);
      if(err === -1) break;
    }
    for(let col = currentSquare.col - 1; col >= 0; col--) {
      let err = Rook.addColMove(_board, currentSquare, moves, col, player);
      if(err === -1) break;
    }

    return moves;
  }

  static addRowMove(_board:Board, currentSquare:Square, moves:Square[], row:number, player:Player) {
    let potentialBlock = _board.getPiece(Square.at(row, currentSquare.col))

    if(potentialBlock !== undefined) {
      if(potentialBlock.player !== player && !(potentialBlock instanceof King)){
        moves.push(Square.at(row, currentSquare.col));
      }
      return -1;
    }

    moves.push(Square.at(row, currentSquare.col));
    return 0
  }

  static addColMove(_board:Board, currentSquare:Square, moves:Square[], col:number, player:Player) {
    let potentialBlock = _board.getPiece(Square.at(currentSquare.row, col))

    if(potentialBlock !== undefined) {
      if(potentialBlock.player !== player && !(potentialBlock instanceof King)){
        moves.push(Square.at(currentSquare.row, col));
      }
      return -1;
    }

    moves.push(Square.at(currentSquare.row, col));
    return 0
  }
}
