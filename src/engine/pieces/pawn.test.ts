import Board from '../board'
import Player from '../player'
import Square from '../square'
import { Pawn } from './pawn'

describe('Pawn', () => {
  describe('white pawns', () => {
    let board: Board
    beforeEach(() => (board = new Board()))

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
  })
})
