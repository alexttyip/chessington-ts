import Board from '../board'
import Player from '../player'
import Square from '../square'
import { King } from './king'
import { Pawn } from './pawn'

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
})
