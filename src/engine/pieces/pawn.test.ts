import Board from '../board'
import Player from '../player'
import Square from '../square'
import { King } from './king'
import { Pawn } from './pawn'
import { Rook } from './rook'

describe('Pawn', () => {
  let board: Board
  beforeEach(() => (board = new Board()))

  describe('white pawns', () => {
    it('can only move one square up if they have already moved', () => {
      const pawn = new Pawn(Player.WHITE)
      board.setPiece(Square.at(1, 0), pawn)
      pawn.moveTo(board, Square.at(2, 0))

      const moves = pawn.getAvailableMoves(board)

      expect(moves).toHaveLength(1)
      expect(moves).toContainEqual(Square.at(3, 0))
    })

    it('can move one or two squares up on their first move', () => {
      const pawn = new Pawn(Player.WHITE)
      board.setPiece(Square.at(1, 7), pawn)

      const moves = pawn.getAvailableMoves(board)

      expect(moves).toHaveLength(2)
      expect(moves).toContainEqual(Square.at(2, 7))
      expect(moves).toContainEqual(Square.at(3, 7))
    })

    it('cannot move at the top of the board', () => {
      const pawn = new Pawn(Player.WHITE)
      board.setPiece(Square.at(7, 3), pawn)

      const moves = pawn.getAvailableMoves(board)

      expect(moves).toHaveLength(0)
    })

    it('move increment numOfMove', () => {
      const pawn = new Pawn(Player.WHITE)
      board.setPiece(Square.at(4, 4), pawn)
      expect(pawn.numOfMove === 0)
      board.movePiece(Square.at(4, 4), Square.at(4, 6))
      expect(board.getPiece(Square.at(4, 6))?.numOfMove === 1)
    })

    it('can en passant', () => {
      const pawn = new Pawn(Player.WHITE)
      board.setPiece(Square.at(4, 4), pawn)
      const blackPawn = new Pawn(Player.BLACK)
      board.setPiece(Square.at(6, 3), blackPawn)
      board.currentPlayer = Player.BLACK
      board.movePiece(Square.at(6, 3), Square.at(4, 3))

      const moves = pawn.getAvailableMoves(board)

      expect(moves).toContainEqual(Square.at(5, 3))
    })
  })

  describe('black pawns', () => {
    let board: Board
    beforeEach(() => (board = new Board(Player.BLACK)))

    it('can only move one square down if they have already moved', () => {
      const pawn = new Pawn(Player.BLACK)
      board.setPiece(Square.at(6, 0), pawn)
      pawn.moveTo(board, Square.at(5, 0))

      const moves = pawn.getAvailableMoves(board)

      expect(moves).toHaveLength(1)
      expect(moves).toContainEqual(Square.at(4, 0))
    })

    it('can move one or two squares down on their first move', () => {
      const pawn = new Pawn(Player.BLACK)
      board.setPiece(Square.at(6, 7), pawn)

      const moves = pawn.getAvailableMoves(board)

      expect(moves).toHaveLength(2)
      expect(moves).toContainEqual(Square.at(4, 7))
      expect(moves).toContainEqual(Square.at(5, 7))
    })

    it('cannot move at the bottom of the board', () => {
      const pawn = new Pawn(Player.BLACK)
      board.setPiece(Square.at(0, 3), pawn)

      const moves = pawn.getAvailableMoves(board)

      expect(moves).toHaveLength(0)
    })
  })

  it('cannot move if there is a piece in front', () => {
    const pawn = new Pawn(Player.BLACK)
    const blockingPiece = new Rook(Player.WHITE)
    board.setPiece(Square.at(6, 3), pawn)
    board.setPiece(Square.at(5, 3), blockingPiece)

    const moves = pawn.getAvailableMoves(board)

    expect(moves).toHaveLength(0)
  })

  it('cannot move two squares if there is a piece two sqaures in front', () => {
    const pawn = new Pawn(Player.BLACK)
    const blockingPiece = new Rook(Player.WHITE)
    board.setPiece(Square.at(6, 3), pawn)
    board.setPiece(Square.at(4, 3), blockingPiece)

    const moves = pawn.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(4, 3))
  })

  it('can move diagonally if there is a piece to take', () => {
    const pawn = new Pawn(Player.WHITE)
    const opposingPiece = new Rook(Player.BLACK)
    board.setPiece(Square.at(4, 4), pawn)
    board.setPiece(Square.at(5, 3), opposingPiece)

    const moves = pawn.getAvailableMoves(board)

    expect(moves).toContainEqual(Square.at(5, 3))
  })

  it('cannot move diagonally if there is no piece to take', () => {
    const pawn = new Pawn(Player.WHITE)
    board.setPiece(Square.at(4, 4), pawn)

    const moves = pawn.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(5, 3))
  })

  it('cannot take a friendly piece', () => {
    const pawn = new Pawn(Player.WHITE)
    const friendlyPiece = new Rook(Player.WHITE)
    board.setPiece(Square.at(4, 4), pawn)
    board.setPiece(Square.at(5, 3), friendlyPiece)

    const moves = pawn.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(5, 3))
  })

  it('cannot take the opposing king', () => {
    const pawn = new Pawn(Player.WHITE)
    const opposingKing = new King(Player.BLACK)
    board.setPiece(Square.at(4, 4), pawn)
    board.setPiece(Square.at(5, 3), opposingKing)

    const moves = pawn.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(5, 3))
  })
})
