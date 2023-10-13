document.addEventListener('DOMContentLoaded', function() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none'; // Hide the modal initially

  const cells = document.querySelectorAll('.cell');
  const winnerModal = document.querySelector('.modal');
  const winnerText = document.querySelector('.winner');
  const restartButton = document.querySelector('.restart');

  let xTurn = true;
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;
  let timer; // Initialize a timer variable

  // Define the time limit (in milliseconds)
  const timeLimit = 10000; // 30 seconds

  // Function to start the timer
  function startTimer() {
    timer = setTimeout(function() {
      if (gameActive) {
        endGame(false, true); // Announce winner (timeout)
      }
    }, timeLimit);
  }

  // Function to reset the timer
  function resetTimer() {
    clearTimeout(timer);
    startTimer();
  }

  // Event listener for cell clicks
  function handleCellClick(event) {
    resetTimer(); // Reset the timer when a move is made
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] === '' && gameActive) {
      gameBoard[index] = xTurn ? 'X' : 'O';
      cell.textContent = gameBoard[index];
      cell.classList.add(xTurn ? 'x' : 'o');

      if (checkWin()) {
        endGame(false);
      } else if (isDraw()) {
        endGame(true);
      } else {
        xTurn = !xTurn;
      }
    }
  }

  function checkWin() {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        winnerText.textContent = `Winner is ${gameBoard[a]}`;
        return true;
      }
    }
    return false;
  }

  function isDraw() {
    return !gameBoard.includes('');
  }

  function endGame(draw, timeout = false) {
    if (timeout) {
      winnerText.textContent = 'Player took too long. Opponent wins!';
    } else if (draw) {
      winnerText.textContent = 'Game is Draw';
    } else {
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          cells[a].style.backgroundColor = 'green';
          cells[b].style.backgroundColor = 'green';
          cells[c].style.backgroundColor = 'green';
          break;
        }
      }
    }

    winnerModal.style.display = 'block';
    gameActive = false;
  }

  function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    xTurn = true;
    winnerModal.style.display = 'none';
    winnerText.textContent = '';
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('x', 'o');
      cell.style.backgroundColor = '#7777';
    });
    startTimer(); // Start the timer again when the game is restarted
  }

  // Define winPatterns...
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // Define the time limit (in milliseconds)...
  // const timeLimit = 30000; // 30 seconds

  // Add event listeners for cell clicks and the restart button...
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  restartButton.addEventListener('click', restartGame);

  // Start the initial timer
  startTimer();
});
