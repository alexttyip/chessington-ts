const Player = Object.freeze({
    WHITE: Symbol('white'),
    BLACK: Symbol('black'),
});

const GameSettings = Object.freeze({
    BOARD_SIZE: 8,
});

class Square {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
    static at(row, col) {
        return new Square(row, col);
    }
    equals(otherSquare) {
        return (!!otherSquare &&
            this.row === otherSquare.row &&
            this.col === otherSquare.col);
    }
    toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }
}

class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer || Player.WHITE;
        this.board = this.createBoard();
    }
    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
    setPiece(square, piece) {
        this.board[square.row][square.col] = piece;
    }
    getPiece(square) {
        return this.board[square.row][square.col];
    }
    findPiece(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }
    movePiece(fromSquare, moveToMake) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            console.log("Moving");
            let toSquare = (moveToMake instanceof SquareWithTag) ? moveToMake.square : moveToMake;
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            movingPiece.moved = true;
            this.currentPlayer =
                this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE;
            if (moveToMake instanceof SquareWithTag) {
                console.log("SquareWithTag Found");
                switch (moveToMake.tag) {
                    case Tag.ENPASSANT:
                        console.log("En Passant");
                        let delta = Player.WHITE ? 1 : -1;
                        let squareBehind = Square.at(toSquare.row - delta, toSquare.col);
                        this.setPiece(squareBehind, undefined);
                        break;
                }
            }
            for (const row of this.board) {
                for (const piece of row) {
                    if (!!piece) {
                        piece.vulnerableToEnPassant = false;
                    }
                }
            }
        }
    }
}
class SquareWithTag {
    constructor(square, tag) {
        this.square = square;
        this.tag = tag;
    }
}
var Tag;
(function (Tag) {
    Tag[Tag["ENPASSANT"] = 0] = "ENPASSANT";
})(Tag || (Tag = {}));

class Piece {
    constructor(player) {
        this.moved = false;
        this.isPawn = false;
        this.vulnerableToEnPassant = false;
        this.player = player;
    }
    getAvailableMoves(_board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }
    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
    static getMoveStatus(_board, piece, newRow, newCol) {
        if (!Piece.isOnBoard(_board, newRow, newCol)) {
            return SquareStatus.UNREACHABLE;
        }
        let potentialBlock = _board.getPiece(Square.at(newRow, newCol));
        if (potentialBlock !== undefined) {
            if (potentialBlock.player !== piece.player && !potentialBlock.isKing()) {
                return SquareStatus.CAPTURABLE;
            }
            return SquareStatus.UNREACHABLE;
        }
        return SquareStatus.EMPTY;
    }
    static isOnBoard(_board, row, col) {
        return 0 <= row && row < _board.board.length && 0 <= col && col < _board.board[row].length;
    }
    isKing() {
        return false;
    }
    getMovesAlongAxes(_board, directions, currentSquare) {
        let moves = [];
        for (const direction of directions) {
            let index = 1;
            let moveStatus = undefined;
            do {
                let newRow = currentSquare.row + index * direction.rowDirection;
                let newCol = currentSquare.col + index * direction.colDirection;
                moveStatus = Piece.getMoveStatus(_board, this, newRow, newCol);
                if (moveStatus !== SquareStatus.UNREACHABLE) {
                    moves.push(Square.at(newRow, newCol));
                }
                index++;
            } while (moveStatus === SquareStatus.EMPTY);
        }
        return moves;
    }
}
var SquareStatus;
(function (SquareStatus) {
    SquareStatus[SquareStatus["CAPTURABLE"] = 0] = "CAPTURABLE";
    SquareStatus[SquareStatus["UNREACHABLE"] = 1] = "UNREACHABLE";
    SquareStatus[SquareStatus["EMPTY"] = 2] = "EMPTY";
})(SquareStatus || (SquareStatus = {}));

class Bishop extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        let currentSquare = _board.findPiece(this);
        let directions = [
            {
                rowDirection: 1,
                colDirection: 1
            },
            {
                rowDirection: -1,
                colDirection: -1
            },
            {
                rowDirection: -1,
                colDirection: 1
            },
            {
                rowDirection: 1,
                colDirection: -1
            },
        ];
        return this.getMovesAlongAxes(_board, directions, currentSquare);
    }
}

class King extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        let moves = [];
        let currentSquare = _board.findPiece(this);
        for (let row = currentSquare.row - 1; row <= currentSquare.row + 1; row++) {
            for (let col = currentSquare.col - 1; col <= currentSquare.col + 1; col++) {
                if (Piece.getMoveStatus(_board, this, row, col) !== SquareStatus.UNREACHABLE) {
                    moves.push(Square.at(row, col));
                }
            }
        }
        return moves;
    }
    isKing() {
        return true;
    }
}

class Knight extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        let moves = [];
        let currentSquare = _board.findPiece(this);
        for (let row = currentSquare.row - 2; row <= currentSquare.row + 2; row++) {
            for (let col = currentSquare.col - 2; col <= currentSquare.col + 2; col++) {
                if (!this.isValidKnightMove(row, col, currentSquare)) {
                    continue;
                }
                if (Piece.getMoveStatus(_board, this, row, col) !== SquareStatus.UNREACHABLE) {
                    moves.push(Square.at(row, col));
                }
            }
        }
        return moves;
    }
    isValidKnightMove(row, col, currentSquare) {
        let rowDifference = Math.abs(row - currentSquare.row);
        let colDifference = Math.abs(col - currentSquare.col);
        if (rowDifference === 1 && colDifference === 2) {
            return true;
        }
        if (rowDifference === 2 && colDifference === 1) {
            return true;
        }
        return false;
    }
}

class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.isPawn = true;
    }
    getAvailableMoves(_board) {
        let currentSquare = _board.findPiece(this);
        let moves = [];
        let delta = -1;
        if (this.player === Player.WHITE) {
            delta = 1;
        }
        let newSquare = Square.at(currentSquare.row + delta, currentSquare.col);
        if (Piece.getMoveStatus(_board, this, newSquare.row, newSquare.col) === SquareStatus.EMPTY) {
            moves.push(newSquare);
            newSquare = Square.at(currentSquare.row + 2 * delta, currentSquare.col);
            if (!this.moved && Piece.getMoveStatus(_board, this, newSquare.row, newSquare.col) === SquareStatus.EMPTY) {
                moves.push(newSquare);
            }
        }
        [-1, 1].forEach(direction => {
            if (this.checkDiagonal(_board, direction, delta, currentSquare) === DiagonalPawnMove.CAPTURE) {
                moves.push(Square.at(currentSquare.row + delta, currentSquare.col + direction));
            }
            else if (this.checkDiagonal(_board, direction, delta, currentSquare) === DiagonalPawnMove.ENPASSANT) {
                moves.push(new SquareWithTag(Square.at(currentSquare.row + delta, currentSquare.col + direction), Tag.ENPASSANT));
            }
        });
        return moves;
    }
    moveTo(board, newSquare) {
        let oldSquare = board.findPiece(this);
        super.moveTo(board, newSquare);
        if (Math.abs(oldSquare.row - newSquare.row) === 2) {
            this.vulnerableToEnPassant = true;
        }
    }
    checkDiagonal(_board, direction, delta, currentSquare) {
        if (Piece.getMoveStatus(_board, this, currentSquare.row + delta, currentSquare.col + direction) === SquareStatus.CAPTURABLE) {
            return DiagonalPawnMove.CAPTURE;
        }
        if (Piece.getMoveStatus(_board, this, currentSquare.row + delta, currentSquare.col + direction) === SquareStatus.EMPTY) {
            let adjacentSquare = Square.at(currentSquare.row, currentSquare.col + direction);
            let pieceToEnPassant = _board.getPiece(adjacentSquare);
            if (pieceToEnPassant instanceof Pawn && pieceToEnPassant.vulnerableToEnPassant) {
                return DiagonalPawnMove.ENPASSANT;
            }
        }
        return DiagonalPawnMove.UNREACHABLE;
    }
}
var DiagonalPawnMove;
(function (DiagonalPawnMove) {
    DiagonalPawnMove[DiagonalPawnMove["CAPTURE"] = 0] = "CAPTURE";
    DiagonalPawnMove[DiagonalPawnMove["ENPASSANT"] = 1] = "ENPASSANT";
    DiagonalPawnMove[DiagonalPawnMove["UNREACHABLE"] = 2] = "UNREACHABLE";
})(DiagonalPawnMove || (DiagonalPawnMove = {}));

class Queen extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        let currentSquare = _board.findPiece(this);
        let directions = [
            {
                rowDirection: 1,
                colDirection: 0
            },
            {
                rowDirection: -1,
                colDirection: 0
            },
            {
                rowDirection: 0,
                colDirection: 1
            },
            {
                rowDirection: 0,
                colDirection: -1
            },
            {
                rowDirection: 1,
                colDirection: 1
            },
            {
                rowDirection: -1,
                colDirection: -1
            },
            {
                rowDirection: -1,
                colDirection: 1
            },
            {
                rowDirection: 1,
                colDirection: -1
            },
        ];
        return this.getMovesAlongAxes(_board, directions, currentSquare);
    }
}

class Rook extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        let currentSquare = _board.findPiece(this);
        let directions = [
            {
                rowDirection: 1,
                colDirection: 0
            },
            {
                rowDirection: -1,
                colDirection: 0
            },
            {
                rowDirection: 0,
                colDirection: 1
            },
            {
                rowDirection: 0,
                colDirection: -1
            },
        ];
        return this.getMovesAlongAxes(_board, directions, currentSquare);
    }
}

let boardUI;
let board;
function squareToPositionString(square) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return letters[square.col] + (square.row + 1).toString();
}
function positionStringToSquare(positionString) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return Square.at(parseInt(positionString.charAt(1), 10) - 1, letters.indexOf(positionString.charAt(0)));
}
function pieceToPieceString(piece) {
    const playerString = piece.player === Player.WHITE ? 'w' : 'b';
    if (piece instanceof Pawn) {
        return playerString + 'P';
    }
    else if (piece instanceof Rook) {
        return playerString + 'R';
    }
    else if (piece instanceof Knight) {
        return playerString + 'N';
    }
    else if (piece instanceof Bishop) {
        return playerString + 'B';
    }
    else if (piece instanceof Queen) {
        return playerString + 'Q';
    }
    else if (piece instanceof King) {
        return playerString + 'K';
    }
}
function boardToPositionObject() {
    let position = {};
    for (let row = 0; row < GameSettings.BOARD_SIZE; row++) {
        for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
            const square = Square.at(row, col);
            const piece = board.getPiece(square);
            if (!!piece) {
                position[squareToPositionString(square)] =
                    pieceToPieceString(piece);
            }
        }
    }
    return position;
}
function onDragStart(_source, piece, _position, _orientation) {
    return ((board.currentPlayer === Player.WHITE && piece.search(/^w/) !== -1) ||
        (board.currentPlayer === Player.BLACK && piece.search(/^b/) !== -1));
}
function onDrop(source, target) {
    const fromSquare = positionStringToSquare(source);
    const toSquare = positionStringToSquare(target);
    const pieceToMove = board.getPiece(fromSquare);
    if (!pieceToMove ||
        !pieceToMove
            .getAvailableMoves(board)
            .some((square) => !(square instanceof Square) || square.equals(toSquare))) {
        return 'snapback';
    }
    pieceToMove.moveTo(board, toSquare);
    updateStatus();
}
function onSnapEnd() {
    boardUI.position(boardToPositionObject());
}
function updateStatus() {
    const player = board.currentPlayer === Player.WHITE ? 'White' : 'Black';
    document.getElementById('turn-status').innerHTML = `${player} to move`;
}
function boardInStartingPosition() {
    let board = new Board();
    for (let i = 0; i < GameSettings.BOARD_SIZE; i++) {
        board.setPiece(Square.at(1, i), new Pawn(Player.WHITE));
        board.setPiece(Square.at(6, i), new Pawn(Player.BLACK));
    }
    for (let i of [0, 7]) {
        board.setPiece(Square.at(0, i), new Rook(Player.WHITE));
        board.setPiece(Square.at(7, i), new Rook(Player.BLACK));
    }
    for (let i of [1, 6]) {
        board.setPiece(Square.at(0, i), new Knight(Player.WHITE));
        board.setPiece(Square.at(7, i), new Knight(Player.BLACK));
    }
    for (let i of [2, 5]) {
        board.setPiece(Square.at(0, i), new Bishop(Player.WHITE));
        board.setPiece(Square.at(7, i), new Bishop(Player.BLACK));
    }
    board.setPiece(Square.at(0, 3), new Queen(Player.WHITE));
    board.setPiece(Square.at(7, 3), new Queen(Player.BLACK));
    board.setPiece(Square.at(0, 4), new King(Player.WHITE));
    board.setPiece(Square.at(7, 4), new King(Player.BLACK));
    return board;
}
const ChessBoard = window['Chessboard'];
function createChessBoard() {
    board = boardInStartingPosition();
    boardUI = ChessBoard('chess-board', {
        showNotation: false,
        draggable: true,
        position: boardToPositionObject(),
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd
    });
    updateStatus();
}
window.addEventListener('load', createChessBoard);

export { createChessBoard };
