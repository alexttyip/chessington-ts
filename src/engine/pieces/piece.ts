import Board from '../board'
import Player from '../player'
import Square from '../square'

export class Piece {
  player: symbol
  moved:boolean = false;
  isPawn = false;
  vulnerableToEnPassant = false;
  constructor(player: Player) {
    this.player = player
  }

  getAvailableMoves(_board: Board): (Square)[] {
    throw new Error(
      'This method must be implemented, and return a list of available moves',
    )
  }

  moveTo(board: Board, newSquare: Square) {
    const currentSquare = board.findPiece(this)
    board.movePiece(currentSquare, newSquare)
  }

  static getMoveStatus(_board: Board, piece: Piece, newRow: number, newCol: number) {
    if (!Piece.isOnBoard(_board, newRow, newCol)) {
      return SquareStatus.UNREACHABLE;
    }

    let potentialBlock = _board.getPiece(Square.at(newRow, newCol))
    if (potentialBlock !== undefined) {
      if (potentialBlock.player !== piece.player && !potentialBlock.isKing()) {
        return SquareStatus.CAPTURABLE;
      }
      return SquareStatus.UNREACHABLE;
    }

    return SquareStatus.EMPTY;
  }

  static isOnBoard(_board:Board, row: number, col: number) {
    return 0 <= row &&row < _board.board.length &&0 <= col && col < _board.board[row].length
  }

  isKing() {
    return false;
  }

  getMovesAlongAxes(_board:Board, directions: {rowDirection:number, colDirection:number}[], currentSquare:Square) {
    let moves:Square[] = [];
    for(const direction of directions) {
      let index = 1;
      let moveStatus = undefined

      do{
        let newRow = currentSquare.row + index * direction.rowDirection;
        let newCol = currentSquare.col + index * direction.colDirection;

        moveStatus = Piece.getMoveStatus(_board, this, newRow, newCol);
        if(moveStatus !== SquareStatus.UNREACHABLE){
          moves.push(Square.at(newRow, newCol));
        }

        index++;
      } while(moveStatus === SquareStatus.EMPTY);
    }
    return moves;
  }
}

export enum SquareStatus {
  CAPTURABLE,
  UNREACHABLE,
  EMPTY
}