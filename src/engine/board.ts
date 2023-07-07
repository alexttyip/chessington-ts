import Player from './player'
import GameSettings from './gameSettings'
import Square from './square'
import { Piece } from './pieces/piece'
import player from './player'

export default class Board {
  currentPlayer: symbol
  board: (Piece | undefined)[][]

  constructor(currentPlayer?: symbol) {
    this.currentPlayer = currentPlayer || Player.WHITE
    this.board = this.createBoard()
  }

  createBoard() {
    const board = new Array(GameSettings.BOARD_SIZE)
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(GameSettings.BOARD_SIZE)
    }
    return board
  }

  setPiece(square: Square, piece: Piece | undefined) {
    this.board[square.row][square.col] = piece
  }

  getPiece(square: Square) {
    return this.board[square.row][square.col]
  }

  findPiece(pieceToFind: Piece) {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === pieceToFind) {
          return Square.at(row, col)
        }
      }
    }
    throw new Error('The supplied piece is not on the board')
  }

  movePiece(fromSquare: Square, toSquare: Square) {
    const movingPiece = this.getPiece(fromSquare)
    if (!!movingPiece && movingPiece.player === this.currentPlayer) {
      if(movingPiece.isPawn && this.isDiagonalMove(fromSquare, toSquare) && this.isEmptySquare(toSquare)){
        console.log("enpassant");
        // En Passant move
        let delta = this.currentPlayer === Player.WHITE ? 1 : -1;
        let capturedSquare = Square.at(toSquare.row - delta, toSquare.col);
        this.setPiece(capturedSquare, undefined);
      }

      this.setPiece(toSquare, movingPiece)
      this.setPiece(fromSquare, undefined)
      movingPiece.moved = true;
      this.currentPlayer =
        this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE

      for(const row of this.board) {
        for(const piece of row) {
          if(!!piece) {
            piece.vulnerableToEnPassant = false;
          }
        }
      }
    }
  }

  isDiagonalMove(fromSquare:Square, toSquare:Square) {
    console.log("diag check");
    let rowDiff = Math.abs(fromSquare.row - toSquare.row);
    console.log(rowDiff)
    let colDiff = Math.abs(fromSquare.col - toSquare.col);
    console.log(colDiff)

    return rowDiff === colDiff;
  }

  isEmptySquare(square:Square) {
    console.log("empty check");
    return this.getPiece(square) === undefined;
  }


}
