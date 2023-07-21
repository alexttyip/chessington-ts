import Player from './player'
import GameSettings from './gameSettings'
import Square from './square'
import { Piece } from './pieces/piece'
import {King, Pawn, Queen} from './pieces'

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

  moveEnPassant(movingPiece: Piece, fromSquare: Square, toSquare: Square) {
    if (movingPiece instanceof Pawn && typeof this.getPiece(toSquare) === 'undefined' && fromSquare.col !== toSquare.col) {
      let enPassantRow = toSquare.row + (this.currentPlayer === Player.WHITE ? -1 : 1)
      let targetLocation = Square.at(enPassantRow, toSquare.col)
      this.setPiece(targetLocation, undefined)
    }
  }

  moveCastling(movingPiece: Piece, fromSquare: Square, toSquare: Square) {
    if (movingPiece instanceof King && Math.abs(fromSquare.col - toSquare.col) === 2) {
      let rookCol = fromSquare.col - toSquare.col < 0 ? 7 : 0
      let rookFrom = Square.at(fromSquare.row, rookCol)
      let rookTo = Square.at(fromSquare.row, fromSquare.col + Math.sign(toSquare.col - fromSquare.col))
      this.movePiece(rookFrom, rookTo)
    }
  }

  pawnPromotion(movingPiece: Piece, toSquare: Square) {
    let promotionRow = (this.currentPlayer === Player.WHITE ? 7 : 0)
    if (movingPiece instanceof Pawn && toSquare.row === promotionRow) {
      this.setPiece(toSquare, new Queen(this.currentPlayer))
    }
  }

  movePiece(fromSquare: Square, toSquare: Square) {
    const movingPiece = this.getPiece(fromSquare)

    if (!!movingPiece && movingPiece.player === this.currentPlayer) {
      this.moveEnPassant(movingPiece, fromSquare, toSquare)
      this.moveCastling(movingPiece, fromSquare, toSquare)
      this.moveCount++
      if (typeof movingPiece.firstMove === 'undefined') {
        movingPiece.firstMove = this.moveCount
      }
      this.setPiece(toSquare, movingPiece)
      this.setPiece(fromSquare, undefined)
      this.pawnPromotion(movingPiece, toSquare)
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

