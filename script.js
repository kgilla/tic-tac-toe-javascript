const player = (name, symbol) => {

  let score = 0;

  return {
    name,
    symbol,
    score
  };
};

const p1 = Object.create(player("", "X"));
const p2 = Object.create(player("", "O"));

/* Game Logic */

const game = (() => {

  document.getElementById("new-game").addEventListener("click", newGame);

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const p = document.getElementById('game-start').addEventListener("click", nameChange)

  function nameChange() {
    input = document.getElementById("form-box");
    p1.name = input[0].value;
    p2.name = input[1].value;
    gameDisplay.showGame();
  }

  function newGame() {
    gameBoard.clean();
    turnCount = 0;
    gameBoard.addListeners();
    gameDisplay.showCurrentTurn();
  }

  const randomTurn = () => {
    let turn = Math.floor(Math.random() * 2);
    return turn == 0 ? p1 : p2;
  }

  function turnSwitch() {
    turnCount == 9 ? tie() : turnCount++;
    return currentTurn = currentTurn == p1 ? p2 : p1;
  }

  function checkWin(gameState) {
    winCombos.forEach(combo => {
      let counter = 0;
      combo.forEach(index => {
        if (gameState[index] == currentTurn.symbol) {
          counter++;
          if (counter == 3) {
            currentTurn.score++
            gameDisplay.win(combo);
          }
        }
      });
    });
  }

  let turnCount = 1;

  let currentTurn = randomTurn();

  return {
    currentTurn,
    turnSwitch,
    checkWin,
    newGame,
    nameChange
  };
})();

/* Game Board Logic */

const gameBoard = (() => {

  /* Game Board INIT */

  let gameState = ["", "", "", "", "", "", "", "", ""];

  const boardSpots = document.querySelectorAll(".board-spot");

  /* Game Board Functions */

  function addListeners() {
    boardSpots.forEach((spot, i) => {
      spot.addEventListener("click", legalMove);
      spot.setAttribute("data", i);
    });
  }

  function removeListeners() {
    boardSpots.forEach(spot => {
      spot.removeEventListener("click", legalMove);
    });
  }

  function legalMove() {
    move = this.getAttribute("data");
    gameState[move] == "" ? addMove(move) : console.log("spot taken idiot");
  }

  function addMove(move) {
    gameState[move] = game.currentTurn.symbol;
    game.checkWin(gameState)
    render()
    game.currentTurn = game.turnSwitch();
  }

  function render() {
    gameState.forEach((spot, i) => {
      boardSpots[i].innerHTML = spot;
    });
  }

  function clean() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    boardSpots.forEach(spot => {
      spot.classList.remove("p1-win", "p2-win");
      spot.innerHTML = "";
    });
  }

  return {
    boardSpots,
    clean,
    addListeners,
    removeListeners
  };
})();

/* Game HUD Logic */

const gameDisplay = (() => {
  const gameInfo = document.getElementById("game-info");
  const p1Score = document.getElementById("p1-score");
  const p2Score = document.getElementById("p2-score");
  const gameBox = document.getElementById("game-box");
  const formBox = document.getElementById("form-box");
  const p1Name = document.getElementById("p1-name");
  const p2Name = document.getElementById("p2-name");

  function showCurrentTurn() {
    gameInfo.innerHTML = `${game.currentTurn.name} Goes First!`;
  }

  function showGame() {
    nameDisplay();
    gameBoard.addListeners();
    formBox.classList.toggle("hidden");
    gameBox.classList.toggle("hidden");
  }

  function nameDisplay() {
    p1Name.innerHTML = p1.name;
    p2Name.innerHTML = p2.name;
    showCurrentTurn();
  }

  function win(combo) {
    color = game.currentTurn == p1 ? "p1-win" : "p2-win";
    combo.forEach(i => {
      gameBoard.boardSpots[i].classList.add(color);
    })
    gameBoard.removeListeners();
    updateScores()
    gameInfo.innerHTML = `${game.currentTurn.name} Wins!`;
  }

  function lose() {
    console.log("loser");
  }

  function tie() {
    console.log("tie");
  }

  function updateScores() {
    p1Score.innerHTML = p1.score;
    p2Score.innerHTML = p2.score;
  }

  return {
    win,
    showCurrentTurn, 
    showGame
  }
})();