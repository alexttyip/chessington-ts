import Board from '../board'
import Player from '../player'
import Square from '../square'
import { Bishop } from './bishop'

describe('Bishop', () => {
  let board: Board
  beforeEach(() => (board = new Board()))

  it('can move diagonally', () => {
    const bishop = new Bishop(Player.WHITE)
    board.setPiece(Square.at(2, 3), bishop)

    const moves = bishop.getAvailableMoves(board)

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
    const bishop = new Bishop(Player.WHITE)
    board.setPiece(Square.at(2, 3), bishop)

    const moves = bishop.getAvailableMoves(board)

    expect(moves).toHaveLength(11)
  })
})
