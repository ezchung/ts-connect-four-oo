/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
var WIDTH = 7;
var HEIGHT = 6;
var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])
/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
    for (var y = 0; y < HEIGHT; y++) {
        board.push(Array.from({ length: WIDTH }));
    }
}
/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
    var board = document.getElementById('board');
    // make column tops (clickable area for adding a piece to that column)
    var top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', handleClick);
    for (var x = 0; x < WIDTH; x++) {
        var headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
    }
    board.append(top);
    // make main part of board
    for (var y = 0; y < HEIGHT; y++) {
        var row = document.createElement('tr');
        for (var x = 0; x < WIDTH; x++) {
            var cell = document.createElement('td');
            cell.setAttribute('id', "".concat(y, "-").concat(x));
            row.append(cell);
        }
        board.append(row);
    }
}
/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
    for (var y = HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
    return null;
}
/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
    var piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add("p".concat(currPlayer));
    piece.style.top = -50 * (y + 2);
    var spot = document.getElementById("".concat(y, "-").concat(x));
    spot.append(piece);
}
/** endGame: announce game end */
function endGame(msg) {
    alert(msg);
}
/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
    // get x from ID of clicked cell
    var x = +evt.target.id;
    // get next spot in column (if none, ignore click)
    var y = findSpotForCol(x);
    if (y === null) {
        return;
    }
    // place piece in board and add to HTML table
    board[y][x] = currPlayer;
    placeInTable(y, x);
    // check for win
    if (checkForWin()) {
        return endGame("Player ".concat(currPlayer, " won!"));
    }
    // check for tie
    if (board.every(function (row) { return row.every(function (cell) { return cell; }); })) {
        return endGame('Tie!');
    }
    // switch players
    currPlayer = currPlayer === 1 ? 2 : 1;
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer
        return cells.every(function (_a) {
            var y = _a[0], x = _a[1];
            return y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer;
        });
    }
    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {
            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
            // find winner (only checking each win-possibility as needed)
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}
makeBoard();
makeHtmlBoard();
