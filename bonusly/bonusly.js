function didIwin(board, player) {
  
  var diagA = player === board[0][0] && player === board[1][1] && player === board[2][2];
  var diagB = player === board[2][0] && player === board[1][1] && player === board[0][2];
  
  // check diagonal win
  if (diagA || diagB) {
    return true;
  }
  
  // down the board
  for (var y = 0; y < board.length; y++) {
    // check the row for a win
    var rowCounter = 0;
    var colCounter = 0;
    
    // across the board
    for (var x = 0; x < board.length; x++) {
      if (board[y][x] === player) {
        // fix row
        rowCounter++;
        if (rowCounter === 3) {
          return true;
        }
      }
      if (board[x][y] === player) {
        // fix col
        colCounter++;
        if (colCounter === 3) {
          return true;
        }
      }
    }
  }
  return false;
}

console.log('Did x win?', '\n', [1,0,0], '\n', [0,1,0], '\n', [0,1,0], '\n', didIwin([[1,0,0],[0,1,0],[0,1,0]], 1)); // false

console.log('Did x win?', '\n', [0,1,0], '\n', [0,1,0], '\n', [0,1,0], '\n', didIwin([[0,1,0],[0,1,0],[0,1,0]], 1)); // true

console.log('Did o win?', '\n', [1,0,0], '\n', [0,1,0], '\n', [0,1,0], '\n', didIwin([[1,0,0],[0,1,0],[0,1,0]], 0)); // true


function multBy2() {
  var matrix = [];
  var currRow;
  
  // create rows
  for (var j = 1; j <= 4; j++) {
    currRow = [];
    
    // create values
    for (var i = 1; i <= 4; i++) {
      currRow.push(i * j);
    }
    
    matrix.push(currRow);
  }
  
  return matrix;
}

console.log(multBy2());
