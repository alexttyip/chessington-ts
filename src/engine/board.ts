import Player from './player'
import GameSettings from './gameSettings'
import Square from './square'
import { Piece } from './pieces/piece'
import { Pawn } from './pieces'

export default class Board {
  currentPlayer: symbol
  board: (Piece | undefined)[][]
  moveCount: number

  constructor(currentPlayer?: symbol) {

    this.currentPlayer = currentPlayer || Player.WHITE
    this.board = this.createBoard()
    this.moveCount = 0
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
      this.moveCount++
      if (movingPiece instanceof Pawn && typeof movingPiece.pawnFirstMove === 'undefined') {
        movingPiece.pawnFirstMove = this.moveCount
      }
      this.setPiece(toSquare, movingPiece)
      this.setPiece(fromSquare, undefined)
      this.currentPlayer =
        this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE
    }
  }

  isInBoard(squareLocation: Square) : boolean {
    if (squareLocation.row > GameSettings.BOARD_SIZE - 1 || squareLocation.row < 0) {
      return false
    }
    if (squareLocation.col > GameSettings.BOARD_SIZE - 1 || squareLocation.col < 0) {
      return false
    }
    return true
  }

  isSquareWithinBoundsAndEmpty(squareLocation: Square) : boolean {
    return this.isInBoard(squareLocation) && !this.getPiece(squareLocation)
  }


}

