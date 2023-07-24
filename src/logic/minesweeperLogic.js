export function generateBoard(INITIAL_BOMBS) {
    let board = Array.from({ length: 10 }, () => Array(10).fill(false));
    for (let i = 0; i < INITIAL_BOMBS; i++) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      board[row][col] = "B";
    }
    return board;
  }