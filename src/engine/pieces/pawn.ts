import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'
import { King } from './king'

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

    if(this.offBoard(_board, currentSquare, delta)){
      return []
    }
    if(this.blockMovement(_board, currentSquare, delta)) {
      return []
    }

    moves.push(Square.at(currentSquare.row + delta, currentSquare.col));
    if(currentSquare.row + 2 *delta < _board.board.length && currentSquare.row + 2 *delta >= 0
      && !this.moved && !_board.getPiece(Square.at(currentSquare.row + 2*delta, currentSquare.col))) {
      moves.push(Square.at(currentSquare.row + 2 *delta, currentSquare.col));
    }

    [-1,1].forEach(direction=> {
      this.checkDiagonal(_board, moves, direction, delta, currentSquare);
    })

    return moves;
  }

  blockMovement(_board:Board, currentSquare:Square, delta:number) {
    return _board.getPiece(Square.at(currentSquare.row + delta, currentSquare.col)) !== undefined;
  }

  offBoard(_board:Board, currentSquare:Square, delta:number){
    return currentSquare.row + delta >= _board.board.length || currentSquare.row + delta < 0
      || _board.getPiece(Square.at(currentSquare.row + delta, currentSquare.col)) !== undefined;
  }

  checkDiagonal(_board: Board, moves:Square[], direction:number, delta:number, currentSquare:Square) {
    const targetSquare = Square.at(currentSquare.row + delta, currentSquare.col + direction);
    const potentialKill = _board.getPiece(targetSquare)
    if(potentialKill !== undefined && !(potentialKill.player === this.player || potentialKill instanceof King)) {
      moves.push(targetSquare);
    }
  }
}
