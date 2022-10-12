import Board from '../board'
import Player from '../player'
import Square from '../square'
import { King } from './king'
import { Pawn } from './pawn'
import { Queen } from './queen'

describe('Queen', () => {
  let board: Board
  beforeEach(() => (board = new Board()))

  it('can move laterally', () => {
    const queen = new Queen(Player.WHITE)
    board.setPiece(Square.at(2, 3), queen)

    const moves = queen.getAvailableMoves(board)

    const expectedMoves = [
      // Horizontal
      Square.at(2, 0),
      Square.at(2, 1),
      Square.at(2, 2),
      Square.at(2, 4),
      Square.at(2, 5),
      Square.at(2, 6),
      Square.at(2, 7),
      // Vertical
      Square.at(0, 3),
      Square.at(1, 3),
      Square.at(3, 3),
      Square.at(4, 3),
      Square.at(5, 3),
      Square.at(6, 3),
      Square.at(7, 3),
    ]

    expect(moves).toEqual(expect.arrayContaining(expectedMoves))
  })

  it('can move diagonally', () => {
    const queen = new Queen(Player.WHITE)
    board.setPiece(Square.at(2, 3), queen)

    const moves = queen.getAvailableMoves(board)

    const expectedMoves = [
      // Forwards diagonal
      Square.at(0, 1),
      Square.at(1, 2),
      Square.at(3, 4),
      Square.at(4, 5),
      Square.at(5, 6),
      Square.at(6, 7),
      // Backwards diagonal
      Square.at(0, 5),
      Square.at(1, 4),
      Square.at(3, 2),
      Square.at(4, 1),
      Square.at(5, 0),
    ]

    expect(moves).toEqual(expect.arrayContaining(expectedMoves))
  })

  it('cannot make any other moves', () => {
    const queen = new Queen(Player.WHITE)
    board.setPiece(Square.at(2, 3), queen)

    const moves = queen.getAvailableMoves(board)

    expect(moves).toHaveLength(25)
  })

  it('cannot move through friendly pieces', () => {
    const queen = new Queen(Player.WHITE)
    const friendlyPiece = new Pawn(Player.WHITE)
    board.setPiece(Square.at(4, 4), queen)
    board.setPiece(Square.at(4, 6), friendlyPiece)

    const moves = queen.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(4, 7))
  })

  it('cannot move through opposing pieces', () => {
    const queen = new Queen(Player.WHITE)
    const opposingPiece = new Pawn(Player.BLACK)
    board.setPiece(Square.at(4, 4), queen)
    board.setPiece(Square.at(4, 6), opposingPiece)

    const moves = queen.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(4, 7))
  })

  it('can take opposing pieces', () => {
    const queen = new Queen(Player.WHITE)
    const opposingPiece = new Pawn(Player.BLACK)
    board.setPiece(Square.at(4, 4), queen)
    board.setPiece(Square.at(4, 6), opposingPiece)

    const moves = queen.getAvailableMoves(board)

    expect(moves).toContainEqual(Square.at(4, 6))
  })

  it('cannot take the opposing king', () => {
    const queen = new Queen(Player.WHITE)
    const opposingKing = new King(Player.BLACK)
    board.setPiece(Square.at(4, 4), queen)
    board.setPiece(Square.at(4, 6), opposingKing)

    const moves = queen.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(4, 6))
  })

  it('cannot take friendly pieces', () => {
    const queen = new Queen(Player.WHITE)
    const friendlyPiece = new Pawn(Player.WHITE)
    board.setPiece(Square.at(4, 4), queen)
    board.setPiece(Square.at(4, 6), friendlyPiece)

    const moves = queen.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(4, 6))
  })
})
