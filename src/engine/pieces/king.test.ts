import Board from '../board'
import Player from '../player'
import Square from '../square'
import { King } from './king'

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
})
