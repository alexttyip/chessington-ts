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
    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer =
                this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE;
        }
    }
    isInBoard(squareLocation) {
        if (squareLocation.row > GameSettings.BOARD_SIZE - 1 || squareLocation.row < 0) {
            return false;
        }
        if (squareLocation.col > GameSettings.BOARD_SIZE - 1 || squareLocation.col < 0) {
            return false;
        }
        return true;
    }
    notOccupiedOrOutOfBounds(squareLocation) {
        return this.isInBoard(squareLocation) && !this.getPiece(squareLocation);
    }
}

function isKing(piece) {
    return (piece === null || piece === void 0 ? void 0 : piece.constructor.name) === 'King';
}
function canCapture(playerLocation, testLocation, board) {
    if (!board.isInBoard(testLocation)) {
        return false;
    }
    const testPiece = board.getPiece(testLocation);
    const playerPiece = board.getPiece(playerLocation);
    return !isKing(testPiece) && (playerPiece === null || playerPiece === void 0 ? void 0 : playerPiece.player) !== (testPiece === null || testPiece === void 0 ? void 0 : testPiece.player);
}
function findTargetsOrEdgesByDirection(location, board, directions) {
    board.getPiece(location);
    let possibleMoves = [];
    for (let direction of directions) {
        for (let steps = 1; steps < GameSettings.BOARD_SIZE; steps++) {
            let newLocation = Square.at(location.row + direction[0] * steps, location.col + direction[1] * steps);
            if (!board.notOccupiedOrOutOfBounds(newLocation)) {
                if (canCapture(location, newLocation, board)) {
                    possibleMoves.push(newLocation);
                }
                break;
            }
            possibleMoves.push(newLocation);
        }
    }
    return possibleMoves;
}
function diagonalMoves(location, board) {
    let locationChanges = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
    return findTargetsOrEdgesByDirection(location, board, locationChanges);
}
function lateralMoves(location, board) {
    let locationChanges = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    return findTargetsOrEdgesByDirection(location, board, locationChanges);
}
class Piece {
    constructor(player) {
        this.player = player;
    }
    getAvailableMoves(_board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }
    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
}

class Bishop extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        try {
            let location = _board.findPiece(this);
            return diagonalMoves(location, _board);
        }
        catch (e) {
            return [];
        }
    }
}

class King extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        let location = _board.findPiece(this);
        let possibleMoves = [];
        let possibleChanges = [[1, 1], [-1, 1], [1, -1], [-1, -1], [0, 1], [0, -1], [-1, 0], [1, 0]];
        for (let change of possibleChanges) {
            let newLocation = Square.at(location.row + change[0], location.col + change[1]);
            if (canCapture(location, newLocation, _board)) {
                possibleMoves.push(newLocation);
            }
        }
        return possibleMoves;
    }
}

class Knight extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        let location = _board.findPiece(this);
        let possibleMoves = [];
        let possibleChanges = [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
        for (let change of possibleChanges) {
            let newLocation = Square.at(location.row + change[0], location.col + change[1]);
            if (canCapture(location, newLocation, _board)) {
                possibleMoves.push(newLocation);
            }
        }
        return possibleMoves;
    }
}

class Pawn extends Piece {
    constructor(player) {
        super(player);
    }
    pawnMove(location, _board) {
        let possibleMoves = [];
        if (this.player === Player.WHITE) {
            possibleMoves.push(Square.at(location.row + 1, location.col));
            if (location.row === 1 && !_board.getPiece(Square.at(location.row + 1, location.col))) {
                possibleMoves.push(Square.at(location.row + 2, location.col));
            }
        }
        else {
            possibleMoves.push(Square.at(location.row - 1, location.col));
            if (location.row === 6 && !_board.getPiece(Square.at(location.row - 1, location.col))) {
                possibleMoves.push(Square.at(location.row - 2, location.col));
            }
        }
        return possibleMoves;
    }
    pawnCapture(location, possibleMoves, _board) {
        if (this.player === Player.WHITE) {
            let newLocations = [Square.at(location.row + 1, location.col + 1), Square.at(location.row + 1, location.col - 1)];
            for (let newLocation of newLocations) {
                if (canCapture(location, newLocation, _board) && _board.getPiece(newLocation) !== undefined) {
                    possibleMoves.push(newLocation);
                }
            }
        }
        else {
            let newLocations = [Square.at(location.row - 1, location.col + 1), Square.at(location.row - 1, location.col - 1)];
            for (let newLocation of newLocations) {
                if (canCapture(location, newLocation, _board) && _board.getPiece(newLocation) !== undefined) {
                    possibleMoves.push(newLocation);
                }
            }
        }
    }
    getAvailableMoves(_board) {
        let location = _board.findPiece(this);
        let possibleMoves = this.pawnMove(location, _board);
        let filteredPossibleMoves = [];
        for (let move of possibleMoves) {
            if (_board.notOccupiedOrOutOfBounds(move)) {
                filteredPossibleMoves.push(move);
            }
        }
        possibleMoves = filteredPossibleMoves;
        this.pawnCapture(location, possibleMoves, _board);
        return possibleMoves;
    }
}

class Queen extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        let location = _board.findPiece(this);
        return lateralMoves(location, _board).concat(diagonalMoves(location, _board));
    }
}

class Rook extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        let location = _board.findPiece(this);
        return lateralMoves(location, _board);
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
            .some((square) => square.equals(toSquare))) {
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
