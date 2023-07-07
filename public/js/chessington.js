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
            movingPiece.numOfMoveMade += 1;
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer =
                this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE;
        }
    }
}

class Piece {
    constructor(player) {
        this.numOfMoveMade = 0;
        this.player = player;
    }
    goInADirectionAndReturnAvailableMoves(board, rowDelta, colDelta) {
        const currentSquare = board.findPiece(this);
        let availableMoves = [];
        let hitEnemyYet = false;
        for (let i = 1; i < 8; i++) {
            if (hitEnemyYet) {
                break;
            }
            let newRow = currentSquare.row + rowDelta * i;
            let newCol = currentSquare.col + colDelta * i;
            if (!this.canItMoveOnTopOfThisSquare(newRow, newCol, board)) {
                break;
            }
            if (this.isSteppingOnEnemyPiece(newRow, newCol, board)) {
                hitEnemyYet = true;
            }
            availableMoves.push(new Square(newRow, newCol));
        }
        return availableMoves;
    }
    getLateralMoves(board) {
        board.findPiece(this);
        let availableMoves = [];
        availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, 1, 0));
        availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, -1, 0));
        availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, 0, 1));
        availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, 0, -1));
        return availableMoves;
    }
    isCoordinateOutOfBound(row, col) {
        return !(Math.max(row, col) < 8 && Math.min(row, col) >= 0);
    }
    isSteppingOnFriendlyPiece(row, col, board) {
        var _a;
        return ((_a = board.getPiece(new Square(row, col))) === null || _a === void 0 ? void 0 : _a.player) === this.player;
    }
    isSteppingOnEnemyPiece(row, col, board) {
        var _a;
        return board.getPiece(new Square(row, col)) && ((_a = board.getPiece(new Square(row, col))) === null || _a === void 0 ? void 0 : _a.player) !== this.player;
    }
    isSteppingOnEnemyKing(row, col, board) {
        var _a;
        return ((_a = board.getPiece(new Square(row, col))) === null || _a === void 0 ? void 0 : _a.constructor.name) === 'King';
    }
    canItMoveOnTopOfThisSquare(row, col, board) {
        if (this.isCoordinateOutOfBound(row, col)) {
            return false;
        }
        if (this.isSteppingOnFriendlyPiece(row, col, board)) {
            return false;
        }
        if (this.isSteppingOnEnemyKing(row, col, board)) {
            return false;
        }
        return true;
    }
    getMoveIfValid(board, rowDelta, colDelta) {
        const currentSquare = board.findPiece(this);
        let newRow = currentSquare.row + rowDelta;
        let newCol = currentSquare.col + colDelta;
        if (this.isCoordinateOutOfBound(newRow, newCol)) {
            return [];
        }
        if (this.isSteppingOnFriendlyPiece(newRow, newCol, board)) {
            return [];
        }
        if (this.isSteppingOnEnemyKing(newRow, newCol, board)) {
            return [];
        }
        return [new Square(newRow, newCol)];
    }
    getDiagonalMoves(board) {
        let availableMoves = [];
        availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, 1, 1));
        availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, -1, 1));
        availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, 1, -1));
        availableMoves.push(...this.goInADirectionAndReturnAvailableMoves(board, -1, -1));
        return availableMoves;
    }
    getAvailableMoves(_board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }
    isMoveEnPassant(board, newSquare) {
        const currentSquare = board.findPiece(this);
        if (this.constructor.name === 'Pawn' && currentSquare.col !== newSquare.col && board.getPiece(newSquare) === undefined) {
            return true;
        }
        return false;
    }
    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        if (this.isMoveEnPassant(board, newSquare)) {
            if (this.player === Player.WHITE) {
                board.setPiece(new Square(newSquare.row - 1, newSquare.col), undefined);
            }
            else {
                board.setPiece(new Square(newSquare.row + 1, newSquare.col), undefined);
            }
        }
        board.movePiece(currentSquare, newSquare);
    }
}

class Bishop extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        return this.getDiagonalMoves(_board);
    }
}

class King extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        const movesCombo = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
        return movesCombo.flatMap((combo) => this.getMoveIfValid(_board, combo[0], combo[1]));
    }
}

class Knight extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        _board.findPiece(this);
        let availableMoves = [];
        const movesCombo = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]];
        movesCombo.forEach((combo) => {
            availableMoves = availableMoves.concat(this.getMoveIfValid(_board, combo[0], combo[1]));
        });
        return availableMoves;
    }
}

class Pawn extends Piece {
    constructor(player) {
        super(player);
    }
    returnMoveIfItIsPossible(_board, currentSquare, rowDelta) {
        const newPosition = new Square(currentSquare.row + rowDelta, currentSquare.col);
        if (rowDelta === 2 || rowDelta === -2) {
            const adjacentPosition = new Square(currentSquare.row + rowDelta / 2, currentSquare.col);
            if (_board.getPiece(adjacentPosition) !== undefined) {
                return [];
            }
        }
        if (!this.isCoordinateOutOfBound(newPosition.row, newPosition.col) && _board.getPiece(newPosition) === undefined) {
            return [newPosition];
        }
        return [];
    }
    takeDiagonalPiece(_board, direction) {
        const currentSquare = _board.findPiece(this);
        let possibleDiagonals = [];
        let newRow = currentSquare.row + direction;
        this.addMoveIfCanCapture(newRow, currentSquare.col + 1, _board, possibleDiagonals);
        this.addMoveIfCanCapture(newRow, currentSquare.col - 1, _board, possibleDiagonals);
        return possibleDiagonals;
    }
    addMoveIfCanCapture(newRow, newCol, _board, possibleDiagonals) {
        if (!this.isCoordinateOutOfBound(newRow, newCol) && this.isSteppingOnEnemyPiece(newRow, newCol, _board) && !this.isSteppingOnEnemyKing(newRow, newCol, _board)) {
            possibleDiagonals.push(new Square(newRow, newCol));
        }
    }
    canEnPassantThisSquare(newRow, newCol, _board, direction) {
        const currentSquare = _board.findPiece(this);
        if (currentSquare.row === 3 || currentSquare.row === 4) {
            let behindPiece = _board.getPiece(new Square(newRow - direction, newCol));
            if ((behindPiece === null || behindPiece === void 0 ? void 0 : behindPiece.constructor.name) === 'Pawn' && this.isSteppingOnEnemyPiece(newRow - direction, newCol, _board) && behindPiece.numOfMoveMade === 1) {
                return true;
            }
        }
        return false;
    }
    addEnPassantMoves(_board, direction) {
        const currentSquare = _board.findPiece(this);
        let availableMoves = [];
        if (this.canEnPassantThisSquare(currentSquare.row + direction, currentSquare.col - 1, _board, direction)) {
            availableMoves.push(new Square(currentSquare.row + direction, currentSquare.col - 1));
        }
        if (this.canEnPassantThisSquare(currentSquare.row + direction, currentSquare.col + 1, _board, direction)) {
            availableMoves.push(new Square(currentSquare.row + direction, currentSquare.col + 1));
        }
        return availableMoves;
    }
    getAvailableMoves(_board) {
        const currentSquare = _board.findPiece(this);
        let availableMoves = [];
        let direction = this.player === Player.WHITE ? 1 : -1;
        availableMoves.push(...this.returnMoveIfItIsPossible(_board, currentSquare, direction));
        if (currentSquare.row === 1 || currentSquare.row === 6) {
            availableMoves.push(...this.returnMoveIfItIsPossible(_board, currentSquare, 2 * direction));
        }
        availableMoves.push(...this.takeDiagonalPiece(_board, direction));
        availableMoves.push(...this.addEnPassantMoves(_board, direction));
        return availableMoves;
    }
}

class Queen extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        const lateralMoves = this.getLateralMoves(_board);
        const diagonalMoves = this.getDiagonalMoves(_board);
        return lateralMoves.concat(diagonalMoves);
    }
}

class Rook extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        return this.getLateralMoves(_board);
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
