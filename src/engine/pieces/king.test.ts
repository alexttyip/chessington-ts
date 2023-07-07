import Board from '../board'
import Player from '../player'
import Square from '../square'
import { King } from './king'
import { Pawn } from './pawn'
import {Rook} from "./rook";

describe('King', () => {
  let board: Board
  beforeEach(() => (board = new Board()))

  it('can move to adjacent squares', () => {
    const king = new King(Player.WHITE)
    board.setPiece(Square.at(3, 4), king)

    const moves = king.getAvailableMoves(board)

    const expectedMoves = [
      Square.at(2, 3),
      Square.at(2, 4),
      Square.at(2, 5),
      Square.at(3, 5),
      Square.at(4, 5),
      Square.at(4, 4),
      Square.at(4, 3),
      Square.at(3, 3),
    ]

    expect(moves).toEqual(expect.arrayContaining(expectedMoves))
  })

  it('cannot make any other moves', () => {
    const king = new King(Player.WHITE)
    board.setPiece(Square.at(3, 4), king)

    const moves = king.getAvailableMoves(board)

    expect(moves).toHaveLength(8)
  })

  it('cannot leave the board', () => {
    const king = new King(Player.WHITE)
    board.setPiece(Square.at(0, 0), king)

    const moves = king.getAvailableMoves(board)

    const expectedMoves = [
      Square.at(0, 1),
      Square.at(1, 1),
      Square.at(1, 0),
    ]

    expect(moves).toEqual(expect.arrayContaining(expectedMoves))
  })

  it('can take opposing pieces', () => {
    const king = new King(Player.WHITE)
    const opposingPiece = new Pawn(Player.BLACK)
    board.setPiece(Square.at(4, 4), king)
    board.setPiece(Square.at(5, 5), opposingPiece)

    const moves = king.getAvailableMoves(board)

    expect(moves).toContainEqual(Square.at(5, 5))
  })

  it('cannot take the opposing king', () => {
    const king = new King(Player.WHITE)
    const opposingKing = new King(Player.BLACK)
    board.setPiece(Square.at(4, 4), king)
    board.setPiece(Square.at(5, 5), opposingKing)

    const moves = king.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(5, 5))
  })

  it('cannot take friendly pieces', () => {
    const king = new King(Player.WHITE)
    const friendlyPiece = new Pawn(Player.WHITE)
    board.setPiece(Square.at(4, 4), king)
    board.setPiece(Square.at(5, 5), friendlyPiece)

    const moves = king.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(5, 5))
  })
  describe('castling', () => {
    const king = new King(Player.WHITE)
    const friendlyRook = new Rook(Player.WHITE)
    it('white king can long castle', () => {

      board.setPiece(Square.at(0, 4), king)
      board.setPiece(Square.at(0, 0), friendlyRook)

      const moves = king.getAvailableMoves(board)

      expect(moves).toContainEqual(Square.at(0, 2))
    })

    it('white king can short castle', () => {

      board.setPiece(Square.at(0, 4), king)
      board.setPiece(Square.at(0, 7), friendlyRook)

      const moves = king.getAvailableMoves(board)

      expect(moves).toContainEqual(Square.at(0, 6))
    })

    it('short castling moves king and rook', () => {

      board.setPiece(Square.at(0, 4), king)
      board.setPiece(Square.at(0, 7), friendlyRook)

      board.movePiece(Square.at(0, 4), Square.at(0, 6))

      expect(board.getPiece(Square.at(0, 6))).toEqual(king)
      expect(board.getPiece(Square.at(0, 5))).toEqual(friendlyRook)
    })

    it('long castling moves king and rook', () => {

      board.setPiece(Square.at(0, 4), king)
      board.setPiece(Square.at(0, 0), friendlyRook)

      board.movePiece(Square.at(0, 4), Square.at(0, 2))

      expect(board.getPiece(Square.at(0, 2))).toEqual(king)
      expect(board.getPiece(Square.at(0, 3))).toEqual(friendlyRook)
    })

    it('king cannot castle if king has moved before', () => {
      const opponentPawn = new Pawn(Player.BLACK)
      board.setPiece(Square.at(6, 0), opponentPawn)
      board.setPiece(Square.at(0, 4), king)
      board.setPiece(Square.at(0, 7), friendlyRook)

      board.movePiece(Square.at(0, 4), Square.at(1, 4))
      board.movePiece(Square.at(6, 0), Square.at(5, 0))
      board.movePiece(Square.at(1, 4), Square.at(0, 4))
      board.movePiece(Square.at(5, 0), Square.at(4, 0))

      const moves = king.getAvailableMoves(board)

      expect(moves).not.toContainEqual(Square.at(0, 6))
    })

    it('king cannot castle if rook has moved before', () => {
      const opponentPawn = new Pawn(Player.BLACK)
      board.setPiece(Square.at(6, 0), opponentPawn)
      board.setPiece(Square.at(0, 4), king)
      board.setPiece(Square.at(0, 7), friendlyRook)

      board.movePiece(Square.at(0, 7), Square.at(1, 7))
      board.movePiece(Square.at(6, 0), Square.at(5, 0))
      board.movePiece(Square.at(1, 7), Square.at(0, 7))
      board.movePiece(Square.at(5, 0), Square.at(4, 0))

      const moves = king.getAvailableMoves(board)

      expect(moves).not.toContainEqual(Square.at(0, 6))
    })

    it('king cannot castle through other pieces', () => {

      const blockingPawn = new Pawn(Player.WHITE)
      board.setPiece(Square.at(0, 4), king)
      board.setPiece(Square.at(0, 7), friendlyRook)
      board.setPiece(Square.at(0, 5), blockingPawn)

      const moves = king.getAvailableMoves(board)

      expect(moves).not.toContainEqual(Square.at(0, 6))

    })
  })

})
