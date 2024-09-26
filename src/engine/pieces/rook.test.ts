import Board from '../board'
import Player from '../player'
import Square from '../square'
import { King } from './king'
import { Pawn } from './pawn'
import { Rook } from './rook'

describe('Rook', () => {
  let board: Board
  beforeEach(() => (board = new Board()))

  it('can move laterally', () => {
    const rook = new Rook(Player.WHITE)
    board.setPiece(Square.at(1, 2), rook)

    const moves = rook.getAvailableMoves(board)

    const expectedMoves = [
      // Horizontal
      Square.at(1, 0),
      Square.at(1, 1),
      Square.at(1, 3),
      Square.at(1, 4),
      Square.at(1, 5),
      Square.at(1, 6),
      Square.at(1, 7),
      // Vertical
      Square.at(0, 2),
      Square.at(2, 2),
      Square.at(3, 2),
      Square.at(4, 2),
      Square.at(5, 2),
      Square.at(6, 2),
      Square.at(7, 2),
    ]

    expect(moves).toEqual(expect.arrayContaining(expectedMoves))
  })

  it('cannot make any other moves', () => {
    const rook = new Rook(Player.WHITE)
    board.setPiece(Square.at(1, 2), rook)

    const moves = rook.getAvailableMoves(board)

    expect(moves).toHaveLength(14)
  })

  it('cannot move through friendly pieces', () => {
    const rook = new Rook(Player.WHITE)
    const friendlyPiece = new Pawn(Player.WHITE)
    board.setPiece(Square.at(4, 4), rook)
    board.setPiece(Square.at(4, 6), friendlyPiece)

    const moves = rook.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(4, 7))
  })

  it('cannot move through opposing pieces', () => {
    const rook = new Rook(Player.WHITE)
    const opposingPiece = new Pawn(Player.BLACK)
    board.setPiece(Square.at(4, 4), rook)
    board.setPiece(Square.at(4, 6), opposingPiece)

    const moves = rook.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(4, 7))
  })

  it('can take opposing pieces', () => {
    const rook = new Rook(Player.WHITE)
    const opposingPiece = new Pawn(Player.BLACK)
    board.setPiece(Square.at(4, 4), rook)
    board.setPiece(Square.at(4, 6), opposingPiece)

    const moves = rook.getAvailableMoves(board)

    expect(moves).toContainEqual(Square.at(4, 6))
  })

  it('cannot take the opposing king', () => {
    const rook = new Rook(Player.WHITE)
    const opposingKing = new King(Player.BLACK)
    board.setPiece(Square.at(4, 4), rook)
    board.setPiece(Square.at(4, 6), opposingKing)

    const moves = rook.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(4, 6))
  })

  it('cannot take friendly pieces', () => {
    const rook = new Rook(Player.WHITE)
    const friendlyPiece = new Pawn(Player.WHITE)
    board.setPiece(Square.at(4, 4), rook)
    board.setPiece(Square.at(4, 6), friendlyPiece)

    const moves = rook.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(4, 6))
  })
})
