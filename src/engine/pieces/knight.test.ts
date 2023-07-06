import Board from '../board'
import Player from '../player'
import Square from '../square'
import { Knight } from './knight'
import { Pawn } from './pawn'

describe('Knight', () => {
  let board: Board
  beforeEach(() => (board = new Board()))

  it('can make knights moves', () => {
    const knight = new Knight(Player.WHITE)
    board.setPiece(Square.at(4, 4), knight)

    const moves = knight.getAvailableMoves(board)

    const expectedMoves = [
      Square.at(2, 5),
      Square.at(2, 3),
      Square.at(3, 6),
      Square.at(3, 2),
      Square.at(5, 6),
      Square.at(5, 2),
      Square.at(6, 5),
      Square.at(6, 3),
    ]

    expect(moves).toEqual(expect.arrayContaining(expectedMoves))
  })

  it('cannot make any other moves', () => {
    const knight = new Knight(Player.WHITE)
    board.setPiece(Square.at(4, 4), knight)

    const moves = knight.getAvailableMoves(board)

    expect(moves).toHaveLength(8)
  })

  it('can jump over other pieces', () => {
    const knight = new Knight(Player.WHITE)
    const firstPawn = new Pawn(Player.WHITE)
    const secondPawn = new Pawn(Player.BLACK)
    board.setPiece(Square.at(4, 4), knight)
    board.setPiece(Square.at(3, 4), firstPawn)
    board.setPiece(Square.at(3, 5), secondPawn)

    const moves = knight.getAvailableMoves(board)

    expect(moves).toContainEqual(Square.at(2, 5))
  })

  it('cannot leave the board', () => {
    const knight = new Knight(Player.WHITE)
    board.setPiece(Square.at(0, 0), knight)

    const moves = knight.getAvailableMoves(board)

    const expectedMoves = [Square.at(1, 2), Square.at(2, 1)]

    expect(moves).toEqual(expect.arrayContaining(expectedMoves))
  })
})
