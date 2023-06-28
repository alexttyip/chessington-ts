import {
  Chessboard,
  Orientation,
  Position,
  ChessboardConstructor,
} from './chessboardjs'

import Board from '../engine/board'
import GameSettings from '../engine/gameSettings'
import Player from '../engine/player'
import Square from '../engine/square'
import {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
  Piece,
} from '../engine/pieces'

let boardUI: Chessboard
let board: Board

function squareToPositionString(square: Square) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  return letters[square.col] + (square.row + 1).toString()
}

function positionStringToSquare(positionString: string) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  return Square.at(
    parseInt(positionString.charAt(1), 10) - 1,
    letters.indexOf(positionString.charAt(0)),
  )
}

function pieceToPieceString(piece: Piece) {
  const playerString = piece.player === Player.WHITE ? 'w' : 'b'

  if (piece instanceof Pawn) {
    return playerString + 'P'
  } else if (piece instanceof Rook) {
    return playerString + 'R'
  } else if (piece instanceof Knight) {
    return playerString + 'N'
  } else if (piece instanceof Bishop) {
    return playerString + 'B'
  } else if (piece instanceof Queen) {
    return playerString + 'Q'
  } else if (piece instanceof King) {
    return playerString + 'K'
  }
}

function boardToPositionObject() {
  let position: Position = {}
  for (let row = 0; row < GameSettings.BOARD_SIZE; row++) {
    for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
      const square = Square.at(row, col)
      const piece = board.getPiece(square)

      if (!!piece) {
        position[squareToPositionString(square)] =
          pieceToPieceString(piece)
      }
    }
  }
  return position
}

function onDragStart(
  _source: string,
  piece: string,
  _position: Position,
  _orientation: Orientation,
) {
  return (
    (board.currentPlayer === Player.WHITE && piece.search(/^w/) !== -1) ||
    (board.currentPlayer === Player.BLACK && piece.search(/^b/) !== -1)
  )
}

function onDrop(source: string, target: string) {
  const fromSquare = positionStringToSquare(source)
  const toSquare = positionStringToSquare(target)
  const pieceToMove = board.getPiece(fromSquare)

  if (
    !pieceToMove ||
    !pieceToMove
      .getAvailableMoves(board)
      .some((square) => square.equals(toSquare))
  ) {
    return 'snapback'
  }
  pieceToMove.moveTo(board, toSquare)
  updateStatus()
}

function onSnapEnd() {
  boardUI.position(boardToPositionObject());
}

function updateStatus() {
  const player = board.currentPlayer === Player.WHITE ? 'White' : 'Black'
  document.getElementById('turn-status')!.innerHTML = `${player} to move`
}

function boardInStartingPosition() {
  let board = new Board()

  for (let i = 0; i < GameSettings.BOARD_SIZE; i++) {
    board.setPiece(Square.at(1, i), new Pawn(Player.WHITE))
    board.setPiece(Square.at(6, i), new Pawn(Player.BLACK))
  }

  for (let i of [0, 7]) {
    board.setPiece(Square.at(0, i), new Rook(Player.WHITE))
    board.setPiece(Square.at(7, i), new Rook(Player.BLACK))
  }

  for (let i of [1, 6]) {
    board.setPiece(Square.at(0, i), new Knight(Player.WHITE))
    board.setPiece(Square.at(7, i), new Knight(Player.BLACK))
  }

  for (let i of [2, 5]) {
    board.setPiece(Square.at(0, i), new Bishop(Player.WHITE))
    board.setPiece(Square.at(7, i), new Bishop(Player.BLACK))
  }

  board.setPiece(Square.at(0, 3), new Queen(Player.WHITE))
  board.setPiece(Square.at(7, 3), new Queen(Player.BLACK))

  board.setPiece(Square.at(0, 4), new King(Player.WHITE))
  board.setPiece(Square.at(7, 4), new King(Player.BLACK))

  return board
}
const ChessBoard = (
  window as unknown as { Chessboard: ChessboardConstructor }
)['Chessboard']
export function createChessBoard() {
  board = boardInStartingPosition()
  boardUI = ChessBoard('chess-board', {
    showNotation: false,
    draggable: true,
    position: boardToPositionObject(),
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd
  })
  updateStatus()
}

window.addEventListener('load', createChessBoard)
