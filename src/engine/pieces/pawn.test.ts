import Board from '../board';
import Player from '../player';
import Square from '../square';
import { Pawn } from './pawn'

describe('Pawn', () => {

  let board: Board;
  beforeEach(() => board = new Board())

  describe('white pawns', () => {
        
    it('can move one square up', () => {
        const pawn = new Pawn(Player.WHITE);
        board.setPiece(Square.at(0, 0), pawn);

        const moves = pawn.getAvailableMoves(board);

        expect(moves).toContainEqual(Square.at(1, 0))
    });

  });

  describe('black pawns', () => {
      
      it('can move one square down', () => {
          const pawn = new Pawn(Player.BLACK);
          board.setPiece(Square.at(7, 7), pawn);

          const moves = pawn.getAvailableMoves(board);

          expect(moves).toContainEqual(Square.at(6, 7));
      });

  });

})
